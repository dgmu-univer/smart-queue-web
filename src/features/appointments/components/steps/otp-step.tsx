'use client';

type Step = {
  id: string;
  title: string;
  description: string;
  verifyId?: string;
};

export default function OtpStep({ step }: { step?: Step }) {
  console.log(step)
  return (<div>OtpStep</div>);
}
