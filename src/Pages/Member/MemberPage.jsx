import { HashIcon, MailIcon, UserIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/Hooks/Context/useAuth';
import { useGetMemberById } from '@/Hooks/Apis/Members/useGetMemberById';

export const MemberPage = () => {
  const { workspaceId, memberId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { isFetching, member, isSuccess } = useGetMemberById(memberId);

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center bg-green-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-500" />
          <p className="text-sm text-green-700">Loading member...</p>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex h-full items-center justify-center bg-green-50">
        <div className="text-center">
          <UserIcon className="mx-auto mb-3 h-12 w-12 text-green-400" />
          <p className="text-green-700">
            Something went wrong loading member details.
          </p>
        </div>
      </div>
    );
  }

  const displayName =
    member?.username || member?.name || member?.email || 'Unknown';

  const initials = displayName.slice(0, 2).toUpperCase();

  const colors = [
    'bg-green-500',
    'bg-emerald-500',
    'bg-lime-500',
    'bg-teal-500',
  ];

  const colorIndex = displayName.charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="relative h-full overflow-y-auto bg-green-50">
      {/* 🌿 Soft background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-200 via-green-100 to-transparent blur-3xl opacity-60" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* 👤 HEADER */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-5">
            <div
              className={`relative flex h-20 w-20 items-center justify-center rounded-full 
          ${avatarColor} text-2xl font-bold text-white shadow-xl`}
            >
              {initials}

              {/* 🟢 Online Indicator */}
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-white" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {displayName}
              </h1>
              <p className="text-sm text-gray-600">{member?.email}</p>

              {/* Status */}
              <p className="text-xs text-green-600 mt-1 font-medium">
                ● Active now
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {String(memberId) !== String(auth?.user?._id) ? (
              <button
                onClick={() =>
                  navigate(`/workspace/${workspaceId}/dm/${memberId}`)
                }
                className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium shadow hover:bg-green-600 transition cursor-pointer"
              >
                Message
              </button>
            ) : null}

            <button className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition cursor-pointer">
              More
            </button>
          </div>
        </div>

        {/* 📦 INFO CARDS */}
        <div className="flex flex-col gap-4">
          {/* Member ID */}
          <div
            className="flex items-center gap-4 rounded-2xl 
        bg-white/70 backdrop-blur-lg px-5 py-4 
        border border-white/40 shadow-md hover:shadow-lg transition"
          >
            <HashIcon className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Member ID</p>
              <p className="text-sm font-medium text-gray-800">
                {member?._id || memberId}
              </p>
            </div>
          </div>

          {/* Email */}
          <div
            className="flex items-center gap-4 rounded-2xl 
        bg-white/70 backdrop-blur-lg px-5 py-4 
        border border-white/40 shadow-md hover:shadow-lg transition"
          >
            <MailIcon className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-800">
                {member?.email || 'N/A'}
              </p>
            </div>
          </div>

          {/* Username */}
          <div
            className="flex items-center gap-4 rounded-2xl 
        bg-white/70 backdrop-blur-lg px-5 py-4 
        border border-white/40 shadow-md hover:shadow-lg transition"
          >
            <UserIcon className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Username</p>
              <p className="text-sm font-medium text-gray-800">
                {member?.username || 'N/A'}
              </p>
              <p className="text-xs text-green-700 mt-1">
                Workspace: {workspaceId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
