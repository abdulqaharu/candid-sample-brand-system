/** Runs in <head> to restore the saved sidebar state without a flash. */
export const sidebarScript = `try{if(localStorage.getItem("candid-sidebar")==="collapsed")document.documentElement.dataset.sidebar="collapsed"}catch(e){}`;
