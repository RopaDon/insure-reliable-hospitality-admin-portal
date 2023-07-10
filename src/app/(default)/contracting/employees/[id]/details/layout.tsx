import SideNavigation from "./side-navigation";

export default function DetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-screen flex">
        <SideNavigation />

        <main className="grow overflow-hidden px-6">
          <div className="w-full h-full max-w-[1072px] mx-auto flex flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
}
