import React from "react";

export const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ title, ...props }, ref) => (
    <div
        ref={ref}
        className="rounded-xl border bg-card text-card-foreground shadow p-4"
    >
        <h3 className="font-bold mb-4">
            {title}
        </h3>
        <div {...props} />
    </div>
))