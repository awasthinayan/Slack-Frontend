import './Editor.css';

import { PanelTopClose, PanelTopOpen } from 'lucide-react';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';

import { Hint } from '../TooltipProvider/Tooltip';

export const Editor = ({
  // variant = 'create',
  // onSubmit,
  // onCancel,
  placeholder,
  // disabled,
  defaultValue,
}) => {
  // const [text, setText] = useState('');
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef();
  // const SubmitRef = useRef();
  // const disabledRef = useRef(disabled);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef();
  const defaultValueRef = useRef(defaultValue);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );

    const options = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quillRef.current.insertText(
                  quillRef.current.getSelection()?.index || 0,
                  '\n'
                );
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quillRef.current.focus();

    return () => {
      container.innerHTML = '';
    };
  }, []);

  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');
    if (toolbarElement) {
      toolbarElement.style.display = isToolbarVisible ? 'none' : 'block';
    }
  };

  return (
    <div
      className="flex flex-col border border-slate-300 rounded-md overflow-hidden 
                  focus-within:shadow-sm focus-within:border-slate-400 bg-white 
                  transition focus-within:ring-2"
    >
      <div ref={containerRef} className="editor-wrapper" />

      <div className="flex items-center px-2 py-1  min-h-[32px]">
        <Hint
          label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'}
          side="top"
          align="center"
        >
          <button
            onClick={toggleToolbar}
            title=""
            className="flex items-center gap-1 text-xs text-gray-400 
                   hover:text-gray-700 transition-colors px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
          >
            {isToolbarVisible ? (
              <PanelTopClose className="h-4 w-4 cursor-pointer" />
            ) : (
              <PanelTopOpen className="h-4 w-4 cursor-pointer" />
            )}
          </button>
        </Hint>
      </div>
    </div>
  );
};
