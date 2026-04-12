import { Editor } from '@/components/Atoms/Editor/Editor';

export const ChatInput = () => {
  return (
    <div className='w-full'>
      <Editor 
        variant="create"
        onSubmit={() => {}}
        onCancel={() => {}} 
        placeholder="Type your message here..."
        disabled={false}
        defaultValue=""
      />
    </div>
  );
};
