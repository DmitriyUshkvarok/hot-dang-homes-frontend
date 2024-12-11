import { relativeToAbsoluteUrls } from '@/utils/relativeToAbsoluteUrls';

interface CallToActionButtonProps {
  content: string;
  url: string;
  justifyContent?: 'left' | 'center' | 'right';
}

const CallToActionButton = ({
  content,
  url,
  justifyContent = 'center',
}: CallToActionButtonProps) => {
  const baseClass = 'btn flex justify-center w-full max-w-[400px]';
  const justifyClass =
    justifyContent === 'left'
      ? 'justify-start'
      : justifyContent === 'right'
        ? 'justify-end'
        : 'justify-center mx-auto';

  return (
    <a
      href={relativeToAbsoluteUrls(url)}
      className={`${baseClass} flex ${justifyClass}`}
    >
      {content}
    </a>
  );
};

export default CallToActionButton;
