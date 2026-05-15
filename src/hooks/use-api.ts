/**
 * Custom hooks for API calls with loading states and error handling
 */
import { useState, useCallback } from 'react';
import { ApiError } from '../services/api-client';
import { documentService } from '../services/document-service';
import type { UseApiState, UseApiReturn } from '../types/api';

export function useApi<T = any>(): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof ApiError
        ? err.message
        : err instanceof Error
          ? err.message
          : 'An unexpected error occurred';

      setError(errorMessage);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

export function useDocumentUpload() {
  const api = useApi();

  const uploadDocument = useCallback(async (file: File) => {
    return api.execute(async () => {
      return documentService.uploadDocument(file);
    });
  }, [api]);

  return {
    ...api,
    uploadDocument,
  };
}

export function useDocumentAnalysis() {
  const api = useApi();

  const analyzeDocument = useCallback(async (fileId: number) => {
    return api.execute(async () => {
      return documentService.analyzeDocument(fileId);
    });
  }, [api]);

  return {
    ...api,
    analyzeDocument,
  };
}

export function useDocumentList() {
  const api = useApi();

  const listDocuments = useCallback(async (page: number = 1, pageSize: number = 10) => {
    return api.execute(async () => {
      return documentService.listDocuments(page, pageSize);
    });
  }, [api]);

  return {
    ...api,
    listDocuments,
  };
}

export function useUploadAndAnalyze() {
  const api = useApi();

  const uploadAndAnalyze = useCallback(async (file: File) => {
    return api.execute(async () => {
      return documentService.uploadAndAnalyze(file);
    });
  }, [api]);

  return {
    ...api,
    uploadAndAnalyze,
  };
}
