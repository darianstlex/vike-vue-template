import { createPageStart } from '@/renderer/model';

import type { data } from './+data';

export const pageStarted = createPageStart<Awaited<ReturnType<typeof data>>>();
