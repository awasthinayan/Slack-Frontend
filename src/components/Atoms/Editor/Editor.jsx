import './Editor.css';

import { ImagePlus, PanelTopClose, PanelTopOpen } from 'lucide-react';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { SelectedImagePreview } from '@/Features/Image/components/SelectedImagePreview';

import { Hint } from '../TooltipProvider/Tooltip';

export const Editor = ({
  onSubmit,
  onTextChange,
  placeholder,
  defaultValue,
  imagePreviewUrls,
  isUploadingImage = false,
  onImageSelect,
  onRemoveImage,
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef();
  const fileInputRef = useRef(null);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef();
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onImageSelectRef = useRef(onImageSelect);
  const hasImageSelected = Boolean(imagePreviewUrls?.length);

  useEffect(() => {
    onTextChangeRef.current = onTextChange;
  }, [onTextChange]);

  useEffect(() => {
    onImageSelectRef.current = onImageSelect;
  }, [onImageSelect]);

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
    const toolbar = quill.getModule('toolbar');

    toolbar.addHandler('image', () => {
      fileInputRef.current?.click();
    });

    const handleTextChange = () => {
      onTextChangeRef.current?.(quill.getText().trim());
    };

    quill.on('text-change', handleTextChange);

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quillRef.current.focus();

    return () => {
      quill.off('text-change', handleTextChange);
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');
    if (!toolbarElement) return;

    toolbarElement.style.display = isToolbarVisible && !hasImageSelected ? 'block' : 'none';
  }, [hasImageSelected, isToolbarVisible]);

  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');
    if (toolbarElement) {
      toolbarElement.style.display = isToolbarVisible ? 'none' : 'block';
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    onImageSelectRef.current?.(files);
    event.target.value = '';
  };

  const handleSubmit = async () => {
    const plainText = quillRef.current?.getText().trim() || '';
    const body = JSON.stringify(quillRef.current?.getContents() || { ops: [] });

    const didSend = await onSubmit({ body, plainText });

    if (!didSend) return;

    onTextChangeRef.current?.('');
    quillRef.current?.setText('');
  };

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden 
                 bg-white/70 backdrop-blur-lg
                 focus-within:ring-2 focus-within:ring-green-400
                 transition shadow-sm"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />

      <SelectedImagePreview
        imagePreviewUrls={imagePreviewUrls}
        canAddMoreImages={(imagePreviewUrls?.length || 0) < 5}
        onAddMoreImages={() => fileInputRef.current?.click()}
        onRemoveImage={onRemoveImage}
      />

      <div
        ref={containerRef}
        className={`editor-wrapper px-3 pt-3 pb-1 ${hasImageSelected ? 'editor-wrapper--attachment' : ''}`}
      />

      <div className="flex items-center px-3 py-2 border-t border-green-100/50">
        <Hint
          label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'}
          side="top"
          align="center"
        >
          <button
            onClick={toggleToolbar}
            className="flex items-center justify-center 
                       text-gray-400 hover:text-gray-700 
                       transition p-1.5 rounded-lg hover:bg-green-100/50 cursor-pointer"
            disabled={hasImageSelected}
          >
            {isToolbarVisible ? (
              <PanelTopClose className="h-4 w-4" />
            ) : (
              <PanelTopOpen className="h-4 w-4" />
            )}
          </button>
        </Hint>

        <Hint label="Add image" side="top" align="center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="ml-2 flex items-center justify-center text-gray-400 hover:text-gray-700 transition p-1.5 rounded-lg hover:bg-green-100/50 cursor-pointer"
          >
            <ImagePlus className="h-4 w-4" />
          </button>
        </Hint>

        <Hint label="Send message" side="top" align="center">
          <Button
            className="ml-auto bg-green-600 hover:bg-green-700 
                       text-white rounded-lg shadow-sm 
                       hover:shadow-md transition-all cursor-pointer"
            size="iconSm"
            onClick={handleSubmit}
            disabled={isUploadingImage}
          >
            <MdSend className="size-5" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
