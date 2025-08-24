import { describe, it, expect, vi } from 'vitest';
import { fileToBase64 } from './fileConversions';

describe('fileToBase64', () => {
  it('resolves with base64 string when FileReader succeeds', async () => {
    const mockFile = new File(['hello'], 'test.txt', { type: 'text/plain' });

    type MockFileReader = {
      readAsDataURL: (file: File) => void;
      result: string | null;
      onload:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null;
      onerror:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null;
    };

    const mockFileReader: MockFileReader = {
      readAsDataURL: vi.fn(),
      result: 'data:text/plain;base64,aGVsbG8=',
      onload: null,
      onerror: null,
    };

    vi.stubGlobal(
      'FileReader',
      vi.fn(() => mockFileReader as unknown as FileReader)
    );

    const promise = fileToBase64(mockFile);

    const event = {
      target: mockFileReader,
    } as unknown as ProgressEvent<FileReader>;
    mockFileReader.onload?.call(mockFileReader as FileReader, event);

    await expect(promise).resolves.toBe('data:text/plain;base64,aGVsbG8=');
  });

  it('rejects when FileReader fails', async () => {
    const mockFile = new File(['oops'], 'fail.txt', { type: 'text/plain' });

    type MockFileReader = {
      readAsDataURL: (file: File) => void;
      result: string | null;
      onload:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null;
      onerror:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null;
    };

    const mockFileReader: MockFileReader = {
      readAsDataURL: vi.fn(),
      result: null,
      onload: null,
      onerror: null,
    };

    vi.stubGlobal(
      'FileReader',
      vi.fn(() => mockFileReader as unknown as FileReader)
    );

    const promise = fileToBase64(mockFile);

    const event = {
      target: mockFileReader,
    } as unknown as ProgressEvent<FileReader>;
    mockFileReader.onerror?.call(mockFileReader as FileReader, event);

    await expect(promise).rejects.toBe(event);
  });
});
