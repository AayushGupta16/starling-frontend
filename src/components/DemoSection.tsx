import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import demoVideo from '../assets/demo.webm';

SyntaxHighlighter.registerLanguage('python', python);

export const DemoSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();

  const updateProgress = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
  const sampleCode = `# Full working script end-to-end
import requests, re, json

def fetch_founder_linkedins(query="web scraping", hits_per_page=100):
    s = requests.Session()

    # 1) Algolia search to discover company IDs sorted by relevance (default)
    ALG_URL = (
        "https://45bwzj1sgc-dsn.algolia.net/1/indexes/*/queries"
        "?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser"
        "&x-algolia-application-id=45BWZJ1SGC"
        "&x-algolia-api-key=ZmQzN2JjZWZmOGQwNDM5MGIzYTg3NDBlMWRhMjZmNjI4YjUzNzdmYTFlNWNmMjllMzVlMDZlNzJjNGFlMTJkMnRhZ0ZpbHRlcnM9JTVCJTVCJTIyam9ic19hcHBsaWNhbnQlMjIlNUQlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ3YWFzJTIyJTVEJnVzZXJUb2tlbj1jVTRRempXMHl3VGhIYTMzWGVPSXdJQjF1VUE5dENXcFl0cThrNm81TFFnJTNE"
    )
    params_str = (
        f"query={requests.utils.quote(query)}&page=0&filters=&"
        "attributesToRetrieve=%5B%22company_id%22%5D&"
        "attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&"
        f"hitsPerPage={hits_per_page}&clickAnalytics=true&distinct=true"
    )
    payload = {"requests": [{
        "indexName": "WaaSPublicCompanyJob_production",
        "params": params_str
    }]}
    headers_alg = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://www.workatastartup.com",
        "referer": "https://www.workatastartup.com/",
        "user-agent": "Mozilla/5.0",
    }
    r = s.post(ALG_URL, data=json.dumps(payload), headers=headers_alg); r.raise_for_status()
    ids = [h["company_id"] for h in r.json()["results"][0]["hits"]]
    print(f"Algolia IDs fetched: {len(ids)}")

    # 2) GET companies page to set cookies and obtain CSRF token
    params = {
        "demographic": "any",
        "hasEquity": "any",
        "hasSalary": "any",
        "industry": "any",
        "interviewProcess": "any",
        "jobType": "any",
        "layout": "list-compact",
        "sortBy": "keyword",  # search relevance
        "tab": "any",
        "usVisaNotRequired": "any",
        "query": query,
    }
    get_headers = {
        "user-agent": "Mozilla/5.0",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "referer": "https://www.workatastartup.com/",
    }
    page = s.get("https://www.workatastartup.com/companies", params=params, headers=get_headers)
    page.raise_for_status()
    m = re.search(r'<meta name="csrf-token" content="([^"]+)"', page.text)
    csrf_token = m.group(1) if m else None
    if not csrf_token:
        raise RuntimeError("CSRF token not found")
    print("CSRF token acquired")

    # 3) Fetch company details including founders
    fetch_headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "origin": "https://www.workatastartup.com",
        "referer": page.url,
        "user-agent": "Mozilla/5.0",
        "x-csrf-token": csrf_token,
        "x-requested-with": "XMLHttpRequest",
    }
    rf = s.post("https://www.workatastartup.com/companies/fetch", headers=fetch_headers, json={"ids": ids})
    rf.raise_for_status()
    companies = rf.json()["companies"]
    print(f"Company records fetched: {len(companies)}")

    linkedins = []
    for comp in companies:
        for f in comp.get("founders") or []:
            url = (f.get("linkedin") or "").strip()
            if url and url.lower().startswith("http"):
                linkedins.append(url)

    # Deduplicate while preserving order
    seen = set()
    unique_linkedins = []
    for url in linkedins:
        if url not in seen:
            seen.add(url)
            unique_linkedins.append(url)

    return unique_linkedins

linkedins = fetch_founder_linkedins()
print("Total linkedin URLs:", len(linkedins))
print("\\n".join(linkedins[:20]))`;

  const copyCode = async () => {
    await navigator.clipboard.writeText(sampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="demo" className="relative z-10 px-4 sm:px-8 py-12 sm:py-16 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold inline-block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-normal py-2">
            See Starling in Action
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Demo Video */}
          <div className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-b border-gray-600/50">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <span className="hidden sm:inline">Live Web Agent Demo</span>
                <span className="sm:hidden">Web Agent Demo</span>
              </h3>
              <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-700/50 rounded-lg backdrop-blur-sm border border-gray-600/30 invisible">
                <span className="text-gray-300 text-sm sm:text-base">Copy</span>
              </div>
            </div>
            <div className="relative text-xs">
              <div className="bg-black" style={{ margin: 0, height: '24rem', position: 'relative' }}>
                <video
                  ref={videoRef}
                  src={demoVideo}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700/50">
                  <div 
                    className="h-full bg-cyan-400" 
                    style={{ width: `${progress}%`, transition: 'none' }}
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Generated Code */}
          <div className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-b border-gray-600/50">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="hidden sm:inline">Generated Python Script</span>
                <span className="sm:hidden">Python Script</span>
              </h3>
              <button
                onClick={copyCode}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-gray-600/30 hover:border-cyan-500/50"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm sm:text-base">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative text-xs">
              <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ margin: 0, height: '24rem' }}>
                {sampleCode}
              </SyntaxHighlighter>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};