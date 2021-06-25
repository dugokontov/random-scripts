import React from 'react';

type Props = {
    children: React.ReactNode;
};

export function SectionHolder({ children }: Props) {
    return <div style={{ position: 'relative' }}>{children}</div>;
}
