import { getTextAlign, TextAlign } from '@/utils/fonts';
import { relativeToAbsoluteUrls } from '@/utils/relativeToAbsoluteUrls';
import { BlockAttributes } from '@/utils/cleanAndTransformBlocks';

export const Paragraph = ({
  textAlign,
  content,
  textColor,
}: BlockAttributes) => {
  return (
    <p
      className={`max-w-5xl mx-auto ${getTextAlign(textAlign as TextAlign)}`}
      style={{ color: textColor as string }}
      dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
    />
  );
};
