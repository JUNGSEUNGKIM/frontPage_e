import React, { ReactNode } from "react";

export default function StatCard({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="w-full h-[22rem] flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4">
            <h3 className="font-bold text-lg mb-4">{title}</h3>
            {children}
        </div>
    );
}

// export const StatCard = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ title, ...props }, ref) => (
//     <div
//         ref={ref}
//         className="rounded-xl border bg-card text-card-foreground shadow p-4"
//     >
//         <h3 className="font-bold mb-4">
//             {title}
//         </h3>
//         <div {...props} />
//     </div>
// ))
