import { useParams } from 'react-router-dom';

import { useGetMemberById } from '@/Hooks/Apis/Members/useGetMemberById';

export const MemberPage = () => {
  const { workspaceId, memberId } = useParams();

  const { isFetching, member, isSuccess } = useGetMemberById(memberId);

  if (isFetching) {
    return (
      <div className="h-full overflow-y-auto bg-[#f8fafc] px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Loading Member...
          </p>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="h-full overflow-y-auto bg-[#f8fafc] px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Member Page
          </p>
          <p className="mt-4 text-slate-600">
            Something went wrong loading member details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#f8fafc] px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Member Page
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {member?.name ||
            member?.username ||
            member?.email ||
            'Unknown Member'}
        </h1>
        <p className="mt-4 text-slate-600">
          Member in workspace <span className="font-medium">{workspaceId}</span>
          .
        </p>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <p>
            <strong>ID:</strong> {member?._id || memberId}
          </p>
          <p>
            <strong>Email:</strong> {member?.email || 'N/A'}
          </p>
          <p>
            <strong>Username:</strong> {member?.username || 'N/A'}
          </p>
          <p>
            <strong>Name:</strong> {member?.name || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};
