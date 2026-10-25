import { defineParams } from '@sveltejs/kit/params';
import { grade } from './grade.js';
import { strand } from './strand.js';

export const params = defineParams({ grade, strand });
