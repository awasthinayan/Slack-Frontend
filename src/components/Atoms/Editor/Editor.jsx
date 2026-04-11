import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';

export const Editor = ({
  variant = 'create',
  onSubmit,
  onCancel,
  placeholder,
  disabled,
  defaultValue,
}) => {
  const [text, setText] = useState('');
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef();
  const SubmitRef = useRef();
  const disabledRef = useRef();
  const placeholderRef = useRef();

  useEffect(() => {
    if (containerRef.current) return;
    const container = containerRef.current;

    const options = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'code-block',
          'link',
          'image',
          'clean',
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
        Keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                return;
              },
              shift_enter: {
                key: 'Enter',
                shiftKey: true,
                handler: () => {
                  quill.insertText(quill.getSelection()?.index || 0, '\n'); // Insert a new line at the cursor position
                },
              },
            },
          },
        },
      },
    };

    const quill = new Quill(container, options);
  }, []);

  return (
    <div className="flex flex-col ">
      <div
        className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm
               focus-within:border-slate-400 bg-white transition focus-within:ring-2"
      >
        <div ref={containerRef} />
      </div>
    </div>
  );
};
