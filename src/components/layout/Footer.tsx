export default function Footer() {
    return (
      <footer className="py-6 md:px-8 md:py-8 mt-12 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} Novelku. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    );
  }
  