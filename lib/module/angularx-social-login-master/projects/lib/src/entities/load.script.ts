export abstract class loadScript {
    protected loadScript(
        id: string,
        src: string,
        onload: any,
        parentElement: any = null
      ): void {
        // get document if platform is only browser
        if (typeof document !== 'undefined' && !document.getElementById(id)) {
          let signInJS = document.createElement('script');
    
          signInJS.async = true;
          signInJS.src = src;
          signInJS.onload = onload;
    
          if (!parentElement) {
            parentElement = document.head;
          }
    
          parentElement.appendChild(signInJS);
        }
      }
}