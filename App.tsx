
import React, { useState } from 'react';
import { TicketData, AnalysisResult, ViewMode } from './types';
import { MOCK_TICKETS, ICONS } from './constants';
import { analyzeTicketWithGemini } from './services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [selectedTicket, setSelectedTicket] = useState<Partial<TicketData> | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Manual input state
  const [manualId, setManualId] = useState('');
  const [manualName, setManualName] = useState('');

  const handleAnalyze = async (ticket: Partial<TicketData>) => {
    setSelectedTicket(ticket);
    setIsAnalyzing(true);
    setCurrentView(ViewMode.ANALYZE);
    
    const result = await analyzeTicketWithGemini(ticket);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualId || !manualName) return;
    handleAnalyze({
      id: manualId,
      name: manualName,
      price: 0 // Unknown price for manual input
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/30 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg mystic-glow">
              <ICONS.Compass />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-400">
                MysticScratch
              </h1>
              <p className="text-xs text-slate-400">算命師專業版概率分析儀</p>
            </div>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={() => setCurrentView(ViewMode.DASHBOARD)}
              className={`p-2 rounded-full transition-colors ${currentView === ViewMode.DASHBOARD ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:bg-slate-800'}`}
             >
               <ICONS.Layout />
             </button>
             <button 
              onClick={() => setCurrentView(ViewMode.HISTORY)}
              className={`p-2 rounded-full transition-colors ${currentView === ViewMode.HISTORY ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:bg-slate-800'}`}
             >
               <ICONS.Star />
             </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 pb-24">
        {currentView === ViewMode.DASHBOARD && (
          <div className="space-y-6">
            {/* Manual Input Form */}
            <section className="bg-slate-900/50 p-6 rounded-2xl border border-purple-500/30 mystic-glow">
              <h2 className="text-lg font-semibold mb-4 text-amber-400 flex items-center gap-2">
                <ICONS.Search /> 手動輸入刮刮樂鑑定
              </h2>
              <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  type="text" 
                  placeholder="輸入刮刮樂編號 (例: 1234)" 
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-white"
                  required
                />
                <input 
                  type="text" 
                  placeholder="輸入刮刮樂名稱 (例: 財神到)" 
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-purple-500 text-white"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl py-3 hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                >
                  開始算命鑑定
                </button>
              </form>
            </section>

            <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 golden-border">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-amber-400"><ICONS.Zap /></span>
                熱門票券數據 (歷史數據)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_TICKETS.map(ticket => (
                  <div 
                    key={ticket.id} 
                    className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer group"
                    onClick={() => handleAnalyze(ticket)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                      <span className="text-amber-400 font-bold">${ticket.price}</span>
                    </div>
                    <h3 className="font-medium text-slate-200 group-hover:text-purple-400 transition-colors">{ticket.name}</h3>
                    <div className="mt-4 text-xs text-slate-400 flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span>剩餘票數</span>
                        <span className="text-slate-200">{ticket.remainingTickets.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>頭獎</span>
                        <span className="text-amber-500 font-semibold">{ticket.topPrize}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-300">
                <ICONS.Layout /> 歷史期望值趨勢
              </h2>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_TICKETS}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                    />
                    <Bar dataKey="expectedReturn" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        )}

        {currentView === ViewMode.ANALYZE && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
                <h3 className="text-2xl font-bold text-slate-200">正在溝通天地能量...</h3>
                <p className="text-slate-400 mt-2">分析編號與名稱之靈動量...</p>
              </div>
            ) : (
              selectedTicket && analysis && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-3xl border border-purple-500/30 mystic-glow relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                      <div className="w-64 h-64 rounded-full border-[10px] border-amber-400"></div>
                    </div>
                    
                    <div className="relative z-10 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 mb-2">
                        <ICONS.Star />
                        <span className="uppercase tracking-widest text-sm font-bold">大師專業鑑定</span>
                      </div>
                      <h2 className="text-4xl font-bold mb-1 text-white">{selectedTicket.name}</h2>
                      <p className="text-slate-400 mb-8 font-mono">鑑定編號: {selectedTicket.id}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Probability */}
                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-inner">
                          <p className="text-slate-400 text-xs mb-1 uppercase tracking-tighter">中獎機率</p>
                          <div className="text-4xl font-black text-purple-400">{analysis.probability}%</div>
                        </div>

                        {/* Predicted Amount */}
                        <div className="bg-amber-900/20 p-6 rounded-2xl border border-amber-500/30 shadow-inner group relative overflow-hidden">
                          <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
                          <p className="text-amber-400/70 text-xs mb-1 uppercase tracking-tighter relative z-10">預測中獎金額</p>
                          <div className="text-4xl font-black text-amber-500 relative z-10 drop-shadow-lg">
                            {analysis.predictedAmount}
                          </div>
                        </div>

                        {/* Luck Score */}
                        <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 shadow-inner">
                          <p className="text-slate-400 text-xs mb-1 uppercase tracking-tighter">契合運勢</p>
                          <div className="text-4xl font-black text-indigo-400">{analysis.luckScore}</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-6 bg-slate-900/80 rounded-2xl border-l-8 border-amber-600 shadow-xl">
                          <h4 className="text-amber-500 font-bold mb-2 flex items-center gap-2">
                            <ICONS.Compass /> 數字與名稱之靈動讀解
                          </h4>
                          <p className="text-lg italic text-slate-200 leading-relaxed">
                            「{analysis.mysticReading}」
                          </p>
                        </div>
                        
                        <div className="p-6 bg-purple-900/30 rounded-2xl border border-purple-500/20">
                          <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                            <ICONS.Zap /> 大師投資建議
                          </h4>
                          <p className="text-slate-200">{analysis.advice}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCurrentView(ViewMode.DASHBOARD)}
                    className="w-full py-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 font-bold text-lg transition-all active:scale-95"
                  >
                    返回鑑定看板
                  </button>
                </div>
              )
            )}
          </div>
        )}

        {currentView === ViewMode.HISTORY && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="w-16 h-16 mb-4 opacity-20">
              <ICONS.Star />
            </div>
            <p>歷史鑑定記錄正在籌備中...</p>
            <p className="text-xs mt-2 italic text-center">「天命有時，記錄無窮。敬請期待大師的筆記本功能。」</p>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-2 pb-6 md:pb-2">
        <div className="max-w-4xl mx-auto flex justify-around items-center">
          <button 
            onClick={() => setCurrentView(ViewMode.DASHBOARD)}
            className={`flex flex-col items-center gap-1 p-2 ${currentView === ViewMode.DASHBOARD ? 'text-amber-400' : 'text-slate-500'}`}
          >
            <ICONS.Layout />
            <span className="text-[10px] font-bold">數據</span>
          </button>
          <div className="relative -top-6">
            <button 
              onClick={() => setCurrentView(ViewMode.DASHBOARD)}
              className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-4 rounded-full shadow-lg shadow-purple-500/40 text-white transform hover:scale-110 active:scale-95 transition-all"
            >
              <ICONS.Zap />
            </button>
          </div>
          <button 
            onClick={() => setCurrentView(ViewMode.HISTORY)}
            className={`flex flex-col items-center gap-1 p-2 ${currentView === ViewMode.HISTORY ? 'text-amber-400' : 'text-slate-500'}`}
          >
            <ICONS.Star />
            <span className="text-[10px] font-bold">記錄</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
