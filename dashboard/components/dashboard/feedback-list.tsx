"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

import { Tables } from "@/types/supabase";

type Feedback = Tables<"feedback">;

interface FeedbackListProps {
  feedback: Feedback[];
}

interface FeedbackMetadata {
  viewport?: string;
  userAgent?: string;
}

export function FeedbackList({ feedback }: FeedbackListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Feedback Messages</h2>
        <p className="text-sm text-muted-foreground">{feedback.length} total</p>
      </div>

      {feedback.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No feedback yet. Share your widget to start collecting feedback!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => {
            const metadata: FeedbackMetadata =
              item.metadata && typeof item.metadata === "string"
                ? JSON.parse(item.metadata)
                : {};

            return (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base font-normal leading-relaxed">
                      {item.message}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>From:</span>
                    <a
                      href={item.page_url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {item.page_url}
                    </a>
                  </div>

                  {metadata.viewport && (
                    <p className="text-xs text-muted-foreground">
                      Viewport: {metadata.viewport}
                    </p>
                  )}

                  {item.created_at && (
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(item.created_at), "PPpp")}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
