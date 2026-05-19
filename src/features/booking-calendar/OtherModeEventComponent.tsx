// OtherModeEventComponent.tsx
import { useState } from 'react';

import { AdmissionSlot } from './generate-data';

interface OtherModeEventProps {
  event: AdmissionSlot
}

export const OtherModeEventComponent = ({ event }: OtherModeEventProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE = 2; // Показываем 2 PIN-кода, остальные под спойлер

  const visiblePins = isExpanded
    ? event.applicants
    : event.applicants.slice(0, MAX_VISIBLE);

  const hasMore = event.applicants.length > MAX_VISIBLE;
  const hasApplicants = event.applicants.length > 0;

  return (
    <div
      style={{
        backgroundColor: hasApplicants ? '#4caf50' : '#f5f5f5',
        padding: '6px',
        borderRadius: '4px',
        color: hasApplicants ? 'white' : '#666',
        cursor: 'pointer',
        fontSize: '12px',
        height: '100%',
        overflow: 'auto',
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '11px' }}>
        {event.start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
      </div>

      {hasApplicants
        ? (
            <>
              {visiblePins.map((applicant, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    padding: '2px 0',
                  }}
                >
                  {applicant.pinCode}
                </div>
              ))}

              {hasMore && !isExpanded && (
                <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>
                  + ещё
                  {' '}
                  {event.applicants.length - MAX_VISIBLE}
                </div>
              )}

              {hasMore && isExpanded && (
                <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>
                  ▼ свернуть
                </div>
              )}
            </>
          )
        : (
            <div style={{ fontSize: '10px', fontStyle: 'italic' }}>
              свободно
            </div>
          )}

      <div style={{
        fontSize: '9px',
        marginTop: '4px',
        textAlign: 'right',
        opacity: 0.8,
      }}
      >
        {event.applicantsCount}
        /10
      </div>
    </div>
  );
};
