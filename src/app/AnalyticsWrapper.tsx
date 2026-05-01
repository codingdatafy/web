/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

'use client';

import { useEffect, useState } from "react";
import { Analytics } from '@vercel/analytics/react';

export default function AnalyticsWrapper() {
  const [shouldTrack, setShouldTrack] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 1. Hostname Check
    const hostname = window.location.hostname;
    const isOfficialDomain = hostname === 'www.codingdatafy.com';

    // 2. Secret Admin Access
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('admin') === 'true') {
      localStorage.setItem('va-disable', 'true');
      console.log('CodingDatafy: Admin mode activated. Tracking disabled.');
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl); 
      alert('Success: Tracking is now disabled for this browser.');
    }

    // 3. Advanced Bot & AI Opt-out Check
    const ua = navigator.userAgent.toLowerCase();
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse|google-inspectiontool|ahrefsbot|semrushbot|gptbot|chatgpt|claudebot|coherebot|headlesschrome|python|node-fetch|axios/i.test(ua);
    
    const isExplicitlyDisabled = localStorage.getItem('va-disable') === 'true';

    // 4. Logic Execution
    if (isOfficialDomain && !isBot && !isExplicitlyDisabled) {
      setShouldTrack(true);
    }
  }, []);

  if (!mounted) return null;

  if (!shouldTrack) return null;

  return (
    <Analytics 
      scriptSrc="/va/lib.js"
      endpoint="/va"
    />
  );
}