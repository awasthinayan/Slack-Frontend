import { HashIcon, MailIcon, UserIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useGetMemberById } from '@/Hooks/Apis/Members/useGetMemberById';

export const MemberPage = () => {
  const { workspaceId, memberId } = useParams();
  const { isFetching, member, isSuccess } = useGetMemberById(memberId);

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1a1d21]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-[#4ECDC4]" />
          <p className="text-sm text-slate-400">Loading member...</p>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex h-full items-center justify-center bg-[#1a1d21]">
        <div className="text-center">
          <UserIcon className="mx-auto mb-3 h-12 w-12 text-slate-600" />
          <p className="text-slate-400">
            Something went wrong loading member details.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Generate avatar initials
  const displayName =
    member?.username || member?.name || member?.email || 'Unknown';
  const initials = displayName.slice(0, 2).toUpperCase();

  // ✅ Generate consistent color from name
  const colors = [
    'bg-rose-500',
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-pink-500',
  ];
  const colorIndex = displayName.charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="h-full overflow-y-auto bg-[#1a1d21]">
      {/* ✅ Top Banner */}
      <div className="h-32 w-full bg-gradient-to-r from-[#2c2d30] to-[#1a1d21]" />

      <div className="mx-auto max-w-2xl px-6 pb-10">
        {/* ✅ Avatar — overlaps banner */}
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full 
                          ${avatarColor} text-3xl font-bold text-white 
                          ring-4 ring-[#1a1d21] shadow-xl`}
          >
            {initials}
          </div>
        </div>

        {/* ✅ Name & Email */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{displayName}</h1>
          <p className="mt-1 text-sm text-slate-400">{member?.email}</p>
        </div>

        {/* ✅ Info Cards */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-[#2c2d30] px-4 py-3 border border-[#3d3f45]">
            <HashIcon className="h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Member ID</p>
              <p className="text-sm font-medium text-slate-200">
                {member?._id || memberId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#2c2d30] px-4 py-3 border border-[#3d3f45]">
            <MailIcon className="h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="text-sm font-medium text-slate-200">
                {member?.email || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#2c2d30] px-4 py-3 border border-[#3d3f45]">
            <UserIcon className="h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Username</p>
              <p className="text-sm font-medium text-slate-200">
                {member?.username || 'N/A'} is part of workspace:{workspaceId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
