"use client";

import { CardAccount } from "@/components/settings/card-account";
import { CardDeleteAccount } from "@/components/settings/card-delete-account";
import { CardPassword } from "@/components/settings/card-password";
import { SidebarSettings } from "@/components/sidebar/sidebar-settings";
import React from "react";

export function SettingsPage() {
  return (
    <>
      <section className="flex min-h-screen px-4 py-2 gap-4">
        <SidebarSettings />
        <div className="flex flex-col gap-6 w-full p-4">
          <CardAccount />
          <CardPassword />
          <CardDeleteAccount />
        </div>
      </section>
    </>
  );
}

export default SettingsPage;
