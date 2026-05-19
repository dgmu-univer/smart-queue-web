// TVDayEventComponent.tsx
import { AdmissionSlot } from './ types';

interface TVDayEventProps {
  event: AdmissionSlot
}

export const TVDayEventComponent = ({ event }: TVDayEventProps) => {
  const hasApplicants = event.applicants.length > 0;

  return (
    <div
      style={{
        backgroundColor: hasApplicants ? '#4caf50' : '#f5f5f5',
        height: '100%',
        overflow: 'auto',
        color: hasApplicants ? 'white' : '#666',
        border: hasApplicants ? '2px solid #2e7d32' : '2px solid #e0e0e0',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Время слота */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottom: hasApplicants ? '1px solid rgba(255,255,255,0.3)' : '1px solid #ccc',
      }}
      >
        {event.start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        {' '}
        -
        {event.end.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
      </div>

      {/* Список всех PIN-кодов (только для day mode) */}
      {hasApplicants
        ? (
            <div style={{ fontSize: '16px', display: 'flex', gap: 10, fontWeight: 'bold' }}>
              {event.applicants.map((applicant, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '4px 0',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                  }}
                >
                  {applicant.pinCode}
                </div>
              ))}
            </div>
          )
        : (
            <div style={{
              textAlign: 'center',
              padding: '20px 0',
              fontStyle: 'italic',
            }}
            >
              ✨ Свободно
            </div>
          )}

      {/* Счётчик */}
      <div style={{
        marginTop: '8px',
        fontSize: '12px',
        textAlign: 'right',
        borderTop: hasApplicants ? '1px solid rgba(255,255,255,0.3)' : '1px solid #ccc',
        paddingTop: '4px',
      }}
      >
        👥
        {' '}
        {event.applicantsCount}
        /10
      </div>
    </div>
  );
};
