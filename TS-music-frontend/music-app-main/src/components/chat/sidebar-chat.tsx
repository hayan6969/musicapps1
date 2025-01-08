import { List } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import JobApplications from "./job-applications";
import { ChatTabs } from "./chat-tabs";

export default function SidebarChat() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>

      {/* Job Applications Section */}
      <div className="flex flex-col px-4 border-b-2 border-black/10">
        <p className="text-xs font-semibold">JOB APPLICATIONS</p>
        <JobApplications />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <ChatTabs />
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col gap-2">
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Contact Us
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
