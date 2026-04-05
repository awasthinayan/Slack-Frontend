import { useParams } from 'react-router-dom';

export const ChannelPage = () => {
  const { workspaceId, channelId } = useParams();

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Channel Page
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">{channelId}</h1>
        <p className="mt-4 text-slate-600">
          Opened as a separate page for workspace <span className="font-medium">{workspaceId}</span>.
        </p>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Channel id: <span className="font-medium text-slate-900">{channelId}</span>
        </div>
      </div>
    </div>
  );
};
