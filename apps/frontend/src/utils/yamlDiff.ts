
export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber?: number; // Line number in the original or modified document
}

export function calculateDiff(originalYaml: string, currentYaml: string): DiffLine[] {
  const originalLines = originalYaml.split('\n');
  const currentLines = currentYaml.split('\n');

  const diff: DiffLine[] = [];
  let originalLineNum = 1;
  let currentLineNum = 1;

  // A very basic diff algorithm. For more complex diffing, a library like 'diff' would be needed.
  // This version focuses on identifying added/removed/unchanged lines in a straightforward manner.

  let i = 0; // pointer for originalLines
  let j = 0; // pointer for currentLines

  while (i < originalLines.length || j < currentLines.length) {
    if (i < originalLines.length && j < currentLines.length) {
      if (originalLines[i] === currentLines[j]) {
        diff.push({ type: 'unchanged', content: originalLines[i], lineNumber: currentLineNum });
        i++;
        j++;
        originalLineNum++;
        currentLineNum++;
      } else {
        // Look ahead to see if the current original line exists later in current, or vice-versa
        const originalFoundInCurrent = currentLines.slice(j).indexOf(originalLines[i]);
        const currentFoundInOriginal = originalLines.slice(i).indexOf(currentLines[j]);

        if (originalFoundInCurrent === -1 && currentFoundInOriginal === -1) {
          // Both lines are unique, assume original was removed and current was added
          diff.push({ type: 'removed', content: originalLines[i], lineNumber: originalLineNum });
          diff.push({ type: 'added', content: currentLines[j], lineNumber: currentLineNum });
          i++;
          j++;
          originalLineNum++;
          currentLineNum++;
        } else if (originalFoundInCurrent !== -1 && (currentFoundInOriginal === -1 || originalFoundInCurrent < currentFoundInOriginal)) {
          // Original line appears later in current, so current line is an addition
          diff.push({ type: 'added', content: currentLines[j], lineNumber: currentLineNum });
          j++;
          currentLineNum++;
        } else {
          // Current line appears later in original, so original line is a removal
          diff.push({ type: 'removed', content: originalLines[i], lineNumber: originalLineNum });
          i++;
          originalLineNum++;
        }
      }
    } else if (i < originalLines.length) {
      // Remaining original lines are removals
      diff.push({ type: 'removed', content: originalLines[i], lineNumber: originalLineNum });
      i++;
      originalLineNum++;
    } else if (j < currentLines.length) {
      // Remaining current lines are additions
      diff.push({ type: 'added', content: currentLines[j], lineNumber: currentLineNum });
      j++;
      currentLineNum++;
    }
  }

  return diff;
}
