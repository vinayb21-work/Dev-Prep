export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground">
        <p className="font-medium">Built for developers</p>
        <p>&copy; {new Date().getFullYear()} DevPrep. All rights reserved.</p>
      </div>
    </footer>
  );
}
