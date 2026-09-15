"use client";

import { useState, useRef, useCallback, Suspense, useEffect } from "react";
import { isHTMLOutput, useLocalStorageHistory } from "@/lib/studioUtils";
import { hasStudioAccess } from "@/lib/purchases";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import SiteNav from "@/components/SiteNav";
import { Tab, UIStyle, Tone, HistoryEntry } from "@/types/studio";
import GeneratePanel from "@/components/studio/GeneratePanel";
import CustomizePanel from "@/components/studio/CustomizePanel";
import OutputPreview from "@/components/studio/OutputPreview";
import HistoryPanel from "@/components/studio/HistoryPanel";
import AIUsageBanner from "@/components/studio/AIUsageBanner";

function StudioContent() {
  const searchParams = useSearchParams();
  const initialTemplateId = searchParams.get("templateId") ?? "";
  const [tab, setTab] = useState<Tab>(initialTemplateId ? "customize" : "generate");
  const [genCategory, setGenCategory] = useState<"ui" | "prompt">("ui");
  const [genDescription, setGenDescription] = useState("");
  const [genStyle, setGenStyle] = useState<UIStyle>("modern");
  const [genSector, setGenSector] = useState("");
  const [genTone, setGenTone] = useState<Tone>("professional");
  const [genOutput, setGenOutput] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [genHistory, setGenHistory] = useState<HistoryEntry[]>(() => { if (typeof window === "undefined") return []; try { return JSON.parse(localStorage.getItem("tl_gen_history") ?? "[]"); } catch { return []; } });
  const [customHistory, setCustomHistory] = useState<HistoryEntry[]>(() => { if (typeof window === "undefined") return []; try { return JSON.parse(localStorage.getItem("tl_custom_history") ?? "[]"); } catch { return []; } });
  const [showHistory, setShowHistory] = useState(false);
  useLocalStorageHistory("tl_gen_history", genHistory, 50);
  useLocalStorageHistory("tl_custom_history", customHistory, 50);
  const [selectedId, setSelectedId] = useState(initialTemplateId);
  const [customInstructions, setCustomInstructions] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [customLoading, setCustomLoading] = useState(false);
  const { isLoaded: authLoaded, userId } = useAuth();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [purchasesLoaded, setPurchasesLoaded] = useState(false);
  const studioAccess = hasStudioAccess(purchasedIds);

  useEffect(() => { if (!authLoaded) return; fetch("/api/purchases").then(r => r.ok ? r.json() : Promise.reject(new Error(`/api/purchases ${r.status}`))).then(data => { setPurchasedIds(data.templateIds ?? []); setPurchasesLoaded(true); }).catch(e => { console.error("[studio]", e); setPurchasesLoaded(true); }); }, [authLoaded, userId]);

  const [copied, setCopied] = useState(false);
  const [outputView, setOutputView] = useState<"code" | "preview">("code");
  const [showTimeoutHint, setShowTimeoutHint] = useState(false);
  const [limitError, setLimitError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang } = useLang();
  const selectedTemplate = getTemplate(selectedId);

  const streamRequest = useCallback(async (url:string, body:Record<string,unknown>, setOutput:(v:string|((prev:string)=>string))=>void, setLoading:(v:boolean)=>void, historyMeta:{label:string;category:"ui"|"prompt"|"guide"|"worksheet"|"tracker"|"script";tab:Tab;input?:string;templateId?:string}) => {
    abortRef.current?.abort(); const controller=new AbortController(); abortRef.current=controller; setOutput(""); setLoading(true); setShowTimeoutHint(false); if(timeoutRef.current) clearTimeout(timeoutRef.current); timeoutRef.current=setTimeout(()=>setShowTimeoutHint(true),22000);
    try { const res=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),signal:controller.signal}); if(!res.ok||!res.body){const err=await res.text();if(res.status===403){setLimitError(err);return;}setOutput(`Error: ${err}`);return;} setLimitError(null); const reader=res.body.getReader(); const decoder=new TextDecoder(); let result=""; while(true){const {done,value}=await reader.read();if(done)break;const chunk=decoder.decode(value,{stream:true});result+=chunk;setOutput(prev=>prev+chunk);} if(result.trim()){const baseEntry={id:Math.random().toString(36).slice(2),output:result,label:historyMeta.label.slice(0,60),category:historyMeta.category,tab:historyMeta.tab,timestamp:Date.now(),input:historyMeta.input,templateId:historyMeta.templateId}; if(historyMeta.tab==="generate") setGenHistory(h=>[baseEntry,...h].slice(0,50)); else setCustomHistory(h=>{const prev=historyMeta.templateId?h.find(e=>e.templateId===historyMeta.templateId):null;const versions:HistoryEntry["versions"]=prev?[...(prev.versions??[]),{timestamp:prev.timestamp,output:prev.output}]:[];const entry:HistoryEntry={...baseEntry,versions};const filtered=historyMeta.templateId?h.filter(e=>e.templateId!==historyMeta.templateId):h;return [entry,...filtered].slice(0,50);});} if(isHTMLOutput(result)) setOutputView("preview"); }
    catch(err){if((err as Error).name!=="AbortError") setOutput(`Error: ${(err as Error).message}`);} finally {setLoading(false);setShowTimeoutHint(false);if(timeoutRef.current)clearTimeout(timeoutRef.current);}
  },[]);

  const handleGenerate=()=>{if(!genDescription.trim())return;const sectorSuffix=genSector&&genSector!=="Other / Custom"?` for a ${genSector} business`:"";const toneSuffix=genCategory==="ui"?`, ${genTone} tone`:"";streamRequest("/api/generate",{category:genCategory,description:`${genDescription}${sectorSuffix}${toneSuffix}`,style:genStyle},setGenOutput,setGenLoading,{label:genDescription,category:genCategory,tab:"generate",input:genDescription});};
  const handleCustomize=()=>{if(!selectedTemplate||!customInstructions.trim())return;streamRequest("/api/customize",{templateContent:selectedTemplate.content,category:selectedTemplate.category,instructions:customInstructions},setCustomOutput,setCustomLoading,{label:customInstructions,category:selectedTemplate.category,tab:"customize",input:customInstructions,templateId:selectedId});};
  const copyToClipboard=(text:string)=>{navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  const activeOutput=tab==="generate"?genOutput:customOutput; const isLoading=tab==="generate"?genLoading:customLoading; const activeCategory=tab==="generate"?genCategory:(selectedTemplate?.category??"ui"); const isUIOutput=activeCategory==="ui"; const activeHistory=tab==="generate"?genHistory:customHistory;
  const handleHistorySelect=(entry:HistoryEntry)=>{if(tab==="generate")setGenOutput(entry.output);else setCustomOutput(entry.output);setShowHistory(false);setOutputView(isHTMLOutput(entry.output)?"preview":"code");};

  return <div className="min-h-screen bg-page"><SiteNav/><AIUsageBanner/>
    {limitError&&<div className="mx-auto w-full max-w-[1500px] px-6 pt-6"><div className="flex gap-4 border border-terra/30 px-4 py-3 text-[13px]"><span className="flex-1 text-terra">{limitError}</span><a href={`/${lang}/ai-studio`} className="text-accent underline underline-offset-4">Upgrade →</a></div></div>}
    <main className="mx-auto w-full max-w-[1500px] px-6 py-10 md:px-10 md:py-14">
      <header className="grid gap-5 border-b border-theme pb-8 md:grid-cols-[180px_1fr_auto] md:items-end"><div className="text-[11px] uppercase tracking-[.16em] text-muted">[02] Studio</div><div><h1 className="text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[.9]">{lang==="it"?"Rendilo tuo.":"Make it yours."}</h1><p className="mt-4 max-w-xl text-[14px] leading-6 text-muted">{lang==="it"?"Genera un nuovo oggetto digitale o trasforma una collezione esistente.":"Generate a new digital object or transform an existing collection."}</p></div><a href={`/${lang}/ai-studio`} className="text-[12px] text-muted underline underline-offset-4">{lang==="it"?"Come funziona":"How it works"} →</a></header>

      <div className="grid min-h-[680px] border-b border-theme lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_minmax(220px,300px)]">
        <section className="border-theme py-8 lg:border-r lg:pr-8"><div className="mb-7 flex border-b border-theme text-[12px] uppercase tracking-[.1em]">{(["generate","customize"] as Tab[]).map(t=><button key={t} onClick={()=>setTab(t)} disabled={t==="generate"&&!studioAccess} className={`flex-1 border-b-2 px-2 pb-3 ${tab===t?"border-current text-theme":"border-transparent text-muted"} disabled:opacity-35`}>{t==="generate"?(lang==="it"?"Genera":"Generate"):(lang==="it"?"Personalizza":"Customize")}</button>)}</div>
          {tab==="generate"?<GeneratePanel genCategory={genCategory} setGenCategory={setGenCategory} genDescription={genDescription} setGenDescription={setGenDescription} genStyle={genStyle} setGenStyle={setGenStyle} genSector={genSector} setGenSector={setGenSector} genTone={genTone} setGenTone={setGenTone} genOutput={genOutput} genLoading={genLoading} hasStudioAccess={studioAccess} onGenerate={handleGenerate} lang={lang}/>:<CustomizePanel selectedId={selectedId} setSelectedId={setSelectedId} customInstructions={customInstructions} setCustomInstructions={setCustomInstructions} customOutput={customOutput} customLoading={customLoading} purchasedIds={purchasedIds} purchasesLoaded={purchasesLoaded} hasStudioAccess={studioAccess} onCustomize={handleCustomize} lang={lang}/>}</section>
        <section className="min-w-0 py-8 lg:px-8"><div className="mb-4 flex items-center justify-between"><span className="text-[11px] uppercase tracking-[.14em] text-muted">Canvas / Output</span><span className="text-[11px] text-muted">{isLoading?(lang==="it"?"Generazione…":"Generating…"):activeOutput?(lang==="it"?"Pronto":"Ready"):(lang==="it"?"In attesa":"Waiting")}</span></div><OutputPreview output={activeOutput} outputView={outputView} setOutputView={setOutputView} copied={copied} onCopy={()=>copyToClipboard(activeOutput)} showTimeoutHint={showTimeoutHint} isLoading={isLoading} isUIOutput={isUIOutput} tab={tab} selectedTemplateId={selectedTemplate?.id} selectedTemplateDownloadType={selectedTemplate?.downloadType} selectedTemplateDownloadUrl={selectedTemplate?.downloadUrl} activeCategory={activeCategory} lang={lang}/></section>
        <aside className="border-theme py-8 lg:border-l lg:pl-8"><div className="mb-5 flex items-center justify-between"><span className="text-[11px] uppercase tracking-[.14em] text-muted">{lang==="it"?"Varianti / Cronologia":"Variants / History"}</span>{activeHistory.length>0&&<button onClick={()=>setShowHistory(v=>!v)} className="text-[11px] underline underline-offset-4">{showHistory?(lang==="it"?"Chiudi":"Close"):`${activeHistory.length}`}</button>}</div>{activeHistory.length===0?<p className="text-[13px] leading-6 text-muted">{lang==="it"?"Le versioni create appariranno qui, senza interrompere il lavoro sul canvas.":"Created versions will appear here without interrupting the canvas."}</p>:!showHistory?<button onClick={()=>setShowHistory(true)} className="w-full border-t border-theme py-4 text-left text-[13px] text-muted hover:text-theme">{lang==="it"?"Apri la cronologia":"Open history"} →</button>:null}{showHistory&&<HistoryPanel genHistory={genHistory} customHistory={customHistory} activeTab={tab} onSelectEntry={handleHistorySelect} onRestoreVersion={output=>{if(tab==="generate")setGenOutput(output);else setCustomOutput(output);setShowHistory(false);setOutputView(isHTMLOutput(output)?"preview":"code");}} onClose={()=>setShowHistory(false)} lang={lang}/>}</aside>
      </div>
      <div className="grid gap-4 py-7 text-[11px] uppercase tracking-[.1em] text-muted sm:grid-cols-3"><span>01 — {lang==="it"?"Scegli o descrivi":"Choose or describe"}</span><span>02 — {lang==="it"?"Genera / modifica":"Generate / modify"}</span><span>03 — {lang==="it"?"Esporta il risultato":"Export the result"}</span></div>
    </main>
  </div>;
}

export default function StudioPage(){return <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>}><StudioContent/></Suspense>;}
