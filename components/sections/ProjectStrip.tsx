'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * ProjectStrip — danh sách dày các project phụ, dạng index entries.
 * ...
 */

type StripItem = {
  cover: string;
  title: string;
  venue: string;
  year: string;
  alt: string;
};

type ProjectStripProps = {
  items: readonly StripItem[];
};

export function ProjectStrip({ items }: ProjectStripProps) {
  return (
    <ul className="flex flex-col">
