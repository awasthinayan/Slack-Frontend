import Quill from 'quill';
import { useMemo } from 'react';

export const MessageRenderer = ({ value }) => {
  const renderedContent = useMemo(() => {
    if (!value) {
      return {
        html: '',
        isEmpty: true,
      };
    }

    const quill = new Quill(document.createElement('div'));
    quill.disable();

    try {
      const content = JSON.parse(value);
      quill.setContents(content);
      return {
        html: quill.root.innerHTML,
        isEmpty: quill.getText().trim().length === 0,
      };
    } catch (error) {
      console.log('Unable to parse message body', error);
      return {
        html: String(value),
        isEmpty: !String(value).trim(),
      };
    }
  }, [value]);

  if (renderedContent.isEmpty) return null;

  return (
    <div
      className="ql-editor p-0"
      dangerouslySetInnerHTML={{ __html: renderedContent.html }}
    />
  );
};
