import { Client as WorkflowClient } from '@aupstash/workflow';
import { QSTASH_TOKEN, QSTASH_URL } from './env.js';
import { token } from 'morgan';

export const workflowClient = new WorkflowClient({
    baseURL: QSTASH_URL,
    token
});