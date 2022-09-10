import { AfterViewInit, Directive, ElementRef, Input, Renderer2, HostListener, SimpleChanges } from "@angular/core";

@Directive({
  selector: "[lazyBgImage]",
})
export class LazyBgImgDirective implements AfterViewInit {
  hasBg = false;
  @Input() isBg = false;
  @Input() lazyBgImage = "";
  unSizeImg = ["phone"];

  @HostListener("window:resize", ["$event"]) onResize(): void {
    if (!this.unChangeableImg(this.lazyBgImage)) this.updateImg(this.lazyBgImage);
  }

  constructor(private el: ElementRef<HTMLImageElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["lazyBgImage"]) {
      this.updateImg(this.lazyBgImage);
    }
  }

  ngAfterViewInit(): void {
    if (document.readyState === "complete") {
      this.initObserver();
    } else {
      document.addEventListener("readystatechange", (event) => {
        if (document.readyState === "complete") {
          this.initObserver();
        }
      });
    }
  }

  initObserver(): void {
    const supports = "loading" in HTMLImageElement.prototype;
    if (supports) this.el.nativeElement.setAttribute("loading", "lazy");

    const observer = new IntersectionObserver((entries, elem) => {
      if (entries[0].isIntersecting && !this.hasBg) {
        elem.disconnect();
        this.hasBg = true;
        this.updateImg(this.lazyBgImage);
      }
    });

    observer.observe(this.el.nativeElement);
  }

  updateImg(img: string): void {
    const fixImg = this.unChangeableImg(img);
    const url = fixImg ? img : this.screenImageUrl(img);
    this.isBg ? this.setBackgroundImage(this.el.nativeElement, url) : this.el.nativeElement.setAttribute("src", url);
  }

  setBackgroundImage(el: HTMLImageElement, url: string) {
    this.renderer.setStyle(this.el.nativeElement, "background-image", `url(${url})`);
    this.renderer.setStyle(this.el.nativeElement, "background-repeat", "no-repeat");
    this.renderer.setStyle(this.el.nativeElement, "background-size", "cover");
  }

  unChangeableImg(url: string): boolean {
    for (const img of this.unSizeImg) if (url.includes(img)) return true;
    return false;
  }

  screenImageUrl(url: string): string {
    const screen = this.checkScreenSize();
    const pattern = /\/(svg|png)\/(.*?)\.(svg|png)$/g;
    const isSVG = /.(svg|png)$/g.exec(this.lazyBgImage)?.[1] === "svg";
    return isSVG ? this.lazyBgImage : this.lazyBgImage.replace(pattern, `/$1/${screen.pre}/$2-${screen.size}.$3`);
  }

  checkScreenSize(): { pre: string; size: number } {
    const screenW = window.innerWidth;
    const screen = { pre: "sm", size: 640 };

    if (screenW > 640 && screenW <= 768) return { pre: "md", size: 768 };
    if (screenW > 768 && screenW <= 1024) return { pre: "lg", size: 1024 };
    if (screenW > 1024) return { pre: "xl", size: 1440 };
    return screen;
  }
}
