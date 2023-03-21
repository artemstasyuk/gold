export function copyText (text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'absolute';
  textarea.style.left = '-99999px';

  // eslint-disable-next-line unicorn/prefer-node-append
  document.body.appendChild(textarea);

  textarea.select();

  document.execCommand('copy');

  document.body.removeChild(textarea);
}
