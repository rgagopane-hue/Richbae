(() => {
  const saveBtn = document.getElementById('saveContact');
  if (!saveBtn) return;

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Gagopane;Reabetswe;;;',
    'FN:Reabetswe Gagopane',
    'ORG:Richbae Group (Pty) Ltd',
    'TITLE:Founder & Director',
    'TEL;TYPE=CELL,VOICE:+27792316864',
    'EMAIL;TYPE=WORK:ReaG@richbae-group.co.za',
    'URL:https://richbae-group.co.za',
    'ADR;TYPE=WORK:;;;Gauteng;;;South Africa',
    'NOTE:AI Governance & Advisory',
    'END:VCARD',
  ].join('\r\n');

  saveBtn.addEventListener('click', () => {
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Reabetswe-Gagopane-Richbae-Group.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    const original = saveBtn.textContent;
    saveBtn.textContent = 'Saved ✓';
    saveBtn.classList.add('is-done');
    setTimeout(() => {
      saveBtn.textContent = original;
      saveBtn.classList.remove('is-done');
    }, 2500);
  });
})();
