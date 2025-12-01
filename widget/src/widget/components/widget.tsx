import { useContext, useState } from 'react';
import { WidgetContext } from '../lib/context';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export function Widget() {
  const [feedback, setFeedback] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  async function sendFeedback() {
    await supabase.from('feedback').insert([{ message: feedback }]);
  }

  const { isOpen, setIsOpen } = useContext(WidgetContext);

  if (!isOpen) {
    return (
      <button className='widget-button' onClick={() => setIsOpen(true)}>
        Feedback
      </button>
    );
  }

  return (
    <div className='widget-container'>
      <div className='widget-header'>
        <h3>Feedback</h3>
        <button
          className='widget-close-button'
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </div>

      <div className='widget-content'>
        <textarea
          value={feedback}
          placeholder='Your feedback...'
          onChange={handleOnChange}
        />
        <button onClick={sendFeedback}>Send</button>
      </div>
    </div>
  );
}
