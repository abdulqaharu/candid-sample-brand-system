/**
 * The section with this id on the page being shown. Pages kept hidden after
 * navigation can share ids, so the first match is not always the right one.
 */
export function findSection(id: string) {
  return [...document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"]`)].find(
    (element) => element.getClientRects().length > 0,
  );
}
