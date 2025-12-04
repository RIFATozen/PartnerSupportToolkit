import { useContext, useState } from 'react';
import { WidgetContext } from '../lib/context';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pongpaisqlqcfkpowksh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbmdwYWlzcWxxY2ZrcG93a3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MTU3NTUsImV4cCI6MjA4MDA5MTc1NX0.h0QDiUycs1haQRAfd_HR0cTXZH3BZPrrEQHwWofr8Eo',
);

export function Widget() {
  const [feedback, setFeedback] = useState('');
  const { isOpen, setIsOpen } = useContext(WidgetContext);

  const { clientKey } = useContext(WidgetContext);
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  async function sendFeedback() {
    if (!feedback.trim()) return;

    if (!clientKey) {
      console.error('Partner ID (data-client-key) bulunamadı!');
      return;
    }

    const { error } = await supabase.from('feedback').insert([
      {
        partner_id: clientKey,
        message: feedback,
        page_url: window.location.href,
        metadata: {
          userAgent: navigator.userAgent,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
        },
      },
    ]);

    if (error) {
      console.error('Insert error:', error);
      return;
    }

    setFeedback('');
    setIsOpen(false);
  }

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
