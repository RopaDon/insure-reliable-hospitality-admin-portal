"use client";

import { useState } from "react";

export default function NotificationsPanel() {
  const [comments, setComments] = useState<boolean>(true);
  const [messages, setMessages] = useState<boolean>(true);
  const [mentions, setMentions] = useState<boolean>(false);

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">My Notifications</h2>

        {/* General */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">General</h3>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">Email</div>
                <div className="text-sm">Receive notifications via email for important updates, announcements, and messages.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{comments ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input type="checkbox" id="comments" className="sr-only" checked={comments} onChange={() => setComments(!comments)} />
                  <label className="bg-slate-400 dark:bg-slate-700" htmlFor="comments">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">Messages</div>
                <div className="text-sm">Enable notifications for new messages, chats, or direct messages to stay connected and receive instant updates.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{messages ? "On" : "Off"}</div>
                <div className="form-switch">
                  <input type="checkbox" id="messages" className="sr-only" checked={messages} onChange={() => setMessages(!messages)} />
                  <label className="bg-slate-400 dark:bg-slate-700" htmlFor="messages">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            <button className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">
              Cancel
            </button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
