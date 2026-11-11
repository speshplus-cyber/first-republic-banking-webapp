// First Republic Private Wealth - Shared Components, Multi-User Switcher & Card-Required Cash Out

(function () {
  // Global Toast function
  window.showToast = function (message, type = 'success') {
    let container = document.getElementById('frb-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'frb-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'frb-toast';

    let iconName = 'check_circle';
    let iconClass = 'text-emerald-400';
    if (type === 'error') {
      iconName = 'error';
      iconClass = 'text-rose-400';
    } else if (type === 'info') {
      iconName = 'info';
      iconClass = 'text-sky-400';
    }

    toast.innerHTML = `
      <span class="material-symbols-outlined ${iconClass} text-xl">${iconName}</span>
      <div class="flex-1 text-xs sm:text-sm font-medium leading-snug">${message}</div>
      <button class="text-white/50 hover:text-white ml-2 text-lg leading-none" onclick="this.parentElement.remove()">Ã—</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  };

  // Render Modern Header with Multi-User Switcher
  window.renderHeader = function (activeTab = 'dashboard') {
    const headerContainer = document.getElementById('site-header');
    if (!headerContainer) return;

    const user = window.FRB.currentUser;
    const allUsers = Object.values(window.FRB.users);
    const unreadCount = (user.notifications || []).filter(n => !n.read).length;

    headerContainer.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <!-- User Profile Pill & Quick User Switcher Trigger -->
        <div class="relative">
          <button onclick="window.toggleUserMenu()" class="flex items-center space-x-2.5 p-1 pr-3 rounded-2xl hover:bg-slate-100 transition-colors btn-pill">
            <div class="relative">
              <img src="${user.avatarUrl}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-950/20 shadow-sm">
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div class="text-left leading-tight hidden sm:block">
              <div class="text-xs font-bold text-slate-900">${user.name}</div>
              <div class="text-[11px] text-emerald-800 font-semibold font-mono">${user.handle}</div>
            </div>
            <span class="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
          </button>

          <!-- MULTI-USER ACCOUNT SWITCHER DROPDOWN -->
          <div id="user-switcher-dropdown" class="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-3xl shadow-2xl p-2 hidden z-50 drawer-slide-in">
            <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Account / Receiver</span>
              <a href="/register" class="text-[11px] text-emerald-800 font-bold hover:underline">+ New ($0)</a>
            </div>

            <div class="max-h-64 overflow-y-auto divide-y divide-slate-100 py-1">
              ${allUsers.map(u => {
                const isCurrent = u.id === window.FRB.activeUserId;
                return `
                  <button onclick="window.switchUserAccount('${u.id}')" class="w-full text-left p-2.5 rounded-2xl flex items-center justify-between transition-colors ${
                    isCurrent ? 'bg-emerald-50/80 text-emerald-950' : 'hover:bg-slate-50 text-slate-700'
                  }">
                    <div class="flex items-center space-x-2.5 min-w-0">
                      <img src="${u.avatarUrl}" class="w-8 h-8 rounded-full object-cover">
                      <div class="min-w-0">
                        <div class="text-xs font-bold truncate">${u.name}</div>
                        <div class="text-[10px] text-slate-400 font-mono truncate">${u.handle}</div>
                      </div>
                    </div>
                    <div class="text-right shrink-0 ml-2">
                      <div class="text-xs font-extrabold font-mono ${u.balance > 0 ? 'text-emerald-700' : 'text-slate-400'}">
                        ${window.FRB.formatCurrency(u.balance)}
                      </div>
                      ${isCurrent ? '<span class="text-[9px] font-bold text-emerald-800 uppercase">Active</span>' : ''}
                    </div>
                  </button>
                `;
              }).join('')}
            </div>

            <div class="border-t border-slate-100 pt-2 px-1 space-y-1">
              <a href="/sign-in" class="block text-center py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50">
                Sign In With Another Account
              </a>
              <a href="/admin-login" class="flex items-center justify-center space-x-1.5 py-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors">
                <span class="material-symbols-outlined text-sm">admin_panel_settings</span>
                <span>Operations &amp; Admin Portal</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Center Brand -->
        <a href="/dashboard" class="flex items-center space-x-2 group">
          <div class="w-8 h-8 rounded-xl bg-[#00241b] text-[#ffd47f] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">shield_with_heart</span>
          </div>
          <div class="flex flex-col items-start leading-none">
            <span class="font-serif font-bold text-sm text-[#00241b] tracking-tight">First Republic</span>
            <span class="text-[9px] uppercase tracking-widest text-[#785a0e] font-semibold mt-0.5">Private Wealth</span>
          </div>
        </a>

        <!-- Right Action Icons -->
        <div class="flex items-center space-x-1 sm:space-x-2">
          <!-- Notification Bell -->
          <button onclick="window.toggleNotificationsDrawer()" class="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" aria-label="Notifications">
            <span class="material-symbols-outlined text-xl">notifications</span>
            ${unreadCount > 0 ? `<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>` : ''}
          </button>

          <!-- Concierge / Banker Icon -->
          <button onclick="window.openConciergeModal()" class="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" title="Contact Banker">
            <span class="material-symbols-outlined text-xl text-[#785a0e]">support_agent</span>
          </button>
        </div>
      </div>

      <!-- Desktop Navigation Bar -->
      <div class="hidden md:block border-t border-slate-100 bg-white/80 backdrop-blur-md">
        <div class="max-w-4xl mx-auto px-4 flex space-x-1 py-1.5">
          <a href="/dashboard" class="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-[#00241b] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Home &amp; Balance
          </a>
          <a href="/transfer" class="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'transfer' ? 'bg-[#00241b] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Pay &amp; Request
          </a>
          <a href="/activity" class="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'activity' ? 'bg-[#00241b] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Activity
          </a>
          <a href="/cards" class="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'cards' ? 'bg-[#00241b] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
            Card
          </a>
          <a href="/admin-login" class="ml-auto px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 flex items-center space-x-1.5 transition-colors border border-emerald-200">
            <span class="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>Admin Portal</span>
          </a>
        </div>
      </div>
    `;
  };

  // Render Mobile Floating Dock
  window.renderBottomNav = function (activeTab = 'dashboard') {
    const navContainer = document.getElementById('site-bottom-nav');
    if (!navContainer) return;

    navContainer.className = "fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-slate-200/80 floating-bottom-bar md:hidden px-6 py-2 flex justify-between items-center";

    const tabs = [
      { id: 'dashboard', label: 'Cash', icon: 'account_balance_wallet', href: '/dashboard' },
      { id: 'cards', label: 'Card', icon: 'credit_card', href: '/cards' },
      { id: 'transfer', label: 'Pay', icon: 'swap_horiz', href: '/transfer', isAccent: true },
      { id: 'activity', label: 'Activity', icon: 'history', href: '/activity' }
    ];

    navContainer.innerHTML = tabs.map(tab => {
      const isActive = activeTab === tab.id;
      if (tab.isAccent) {
        return `
          <a href="${tab.href}" class="flex flex-col items-center justify-center -mt-5">
            <div class="w-12 h-12 rounded-full bg-[#00241b] text-[#ffd47f] flex items-center justify-center shadow-lg active:scale-95 transition-transform border-2 border-white">
              <span class="material-symbols-outlined text-2xl font-bold">swap_horiz</span>
            </div>
            <span class="text-[10px] font-bold text-slate-800 mt-1 uppercase tracking-wider">Pay &amp; Request</span>
          </a>
        `;
      }
      return `
        <a href="${tab.href}" class="flex flex-col items-center justify-center py-1 transition-colors ${
          isActive ? 'text-[#00241b] font-bold' : 'text-slate-400 hover:text-slate-700'
        }">
          <span class="material-symbols-outlined text-2xl" ${isActive ? `style="font-variation-settings: 'FILL' 1;"` : ''}>${tab.icon}</span>
          <span class="text-[10px] font-medium tracking-wide mt-0.5">${tab.label}</span>
        </a>
      `;
    }).join('');
  };

  // Global Modals Host
  window.initGlobalModals = function () {
    if (document.getElementById('frb-global-modals')) return;

    const modalHost = document.createElement('div');
    modalHost.id = 'frb-global-modals';
    modalHost.innerHTML = `
      <!-- ADD CASH MODAL -->
      <div id="add-cash-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" onclick="window.closeAddCashModal()"></div>
        <div class="relative bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl z-10 drawer-slide-in">
          <div class="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 class="text-base font-bold text-slate-900">Add Cash</h3>
            <button onclick="window.closeAddCashModal()" class="text-slate-400 hover:text-slate-700 p-1">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="py-4 text-center">
            <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount to Add</label>
            <div class="flex items-center justify-center my-3 text-3xl font-extrabold text-slate-900 font-mono">
              <span class="text-emerald-600 mr-1">$</span>
              <input id="addCashAmountInput" type="number" step="1" min="1" value="100" class="w-36 text-center text-3xl font-extrabold text-slate-900 border-0 border-b-2 border-emerald-600 focus:ring-0 p-0">
            </div>

            <div class="grid grid-cols-4 gap-2 my-4">
              <button onclick="document.getElementById('addCashAmountInput').value = '25'" class="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 btn-pill">+$25</button>
              <button onclick="document.getElementById('addCashAmountInput').value = '50'" class="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 btn-pill">+$50</button>
              <button onclick="document.getElementById('addCashAmountInput').value = '100'" class="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 btn-pill">+$100</button>
              <button onclick="document.getElementById('addCashAmountInput').value = '500'" class="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 btn-pill">+$500</button>
            </div>

            <button onclick="window.submitAddCash()" class="w-full py-3.5 rounded-2xl bg-[#00241b] text-white font-bold text-sm hover:bg-emerald-950 transition-all btn-pill shadow-lg shadow-emerald-950/20">
              Add Cash Instantly
            </button>
          </div>
        </div>
      </div>

      <!-- CASHOUT MODAL (SUPPORTS CASH APP, BANK, PAYPAL & DEBIT CARD!) -->
      <div id="cash-out-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" onclick="window.closeCashOutModal()"></div>
        <div class="relative bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 drawer-slide-in max-h-[92vh] overflow-y-auto">
          <div class="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-bold text-slate-900">Cash Out Funds</h3>
              <p class="text-[11px] text-slate-500">Choose payout destination: Cash App, Bank, PayPal or Card</p>
            </div>
            <button onclick="window.closeCashOutModal()" class="text-slate-400 hover:text-slate-700 p-1">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Amount Entry -->
          <div class="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100 mt-4 mb-3">
            <span class="text-[11px] text-slate-400 font-semibold block">Available to Cash Out: <strong class="text-slate-800" id="cashOutAvailableDisplay">$0.00</strong></span>
            <div class="flex items-center justify-center text-3xl font-extrabold font-mono text-slate-900 my-1">
              <span class="text-emerald-700 mr-1 text-2xl">$</span>
              <input id="cashOutAmountInput" type="number" step="0.01" min="1" value="50.00" class="w-32 text-center text-3xl font-extrabold text-slate-900 border-0 bg-transparent p-0 focus:ring-0">
            </div>
            <div class="flex justify-center space-x-2 mt-2">
              <button type="button" onclick="setCashOutPercent(0.25)" class="px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-100">25%</button>
              <button type="button" onclick="setCashOutPercent(0.50)" class="px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-100">50%</button>
              <button type="button" onclick="setCashOutPercent(1.00)" class="px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800 hover:bg-emerald-100">Max</button>
            </div>
          </div>

          <!-- Payout Method Selector (Cash App, Bank, PayPal, Card) -->
          <div class="mb-4">
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Select Payout Destination</label>
            <div class="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <!-- Cash App Button -->
              <button type="button" onclick="selectCashOutMethod('cashapp')" id="tabMethodCashApp" class="py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-emerald-500 text-white font-bold shadow-sm">
                <span class="font-extrabold text-sm leading-none font-mono">$</span>
                <span class="text-[10px] mt-1 font-bold truncate w-full">Cash App</span>
              </button>

              <!-- Bank Account Button -->
              <button type="button" onclick="selectCashOutMethod('bank')" id="tabMethodBank" class="py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all text-slate-600 hover:text-slate-900">
                <span class="material-symbols-outlined text-base leading-none">account_balance</span>
                <span class="text-[10px] mt-1 font-bold truncate w-full">Bank</span>
              </button>

              <!-- PayPal Button -->
              <button type="button" onclick="selectCashOutMethod('paypal')" id="tabMethodPayPal" class="py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all text-slate-600 hover:text-slate-900">
                <span class="material-symbols-outlined text-base leading-none">payments</span>
                <span class="text-[10px] mt-1 font-bold truncate w-full">PayPal</span>
              </button>

              <!-- Debit Card Button -->
              <button type="button" onclick="selectCashOutMethod('card')" id="tabMethodCard" class="py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all text-slate-600 hover:text-slate-900">
                <span class="material-symbols-outlined text-base leading-none">credit_card</span>
                <span class="text-[10px] mt-1 font-bold truncate w-full">Card</span>
              </button>
            </div>
          </div>

          <form onsubmit="event.preventDefault(); window.submitMultiMethodCashOut();" class="space-y-4">

            <!-- ==================== METHOD 1: CASH APP FORM ==================== -->
            <div id="sectionCashApp" class="space-y-3">
              <div class="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-xl bg-emerald-500 text-white font-bold font-mono flex items-center justify-center shrink-0">
                  $
                </div>
                <div>
                  <div class="text-xs font-bold text-emerald-950">Cash App Direct Payout</div>
                  <div class="text-[10px] text-emerald-700">Instant transfer directly to your $cashtag</div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">Your Cash App $cashtag</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-2.5 text-emerald-600 font-extrabold font-mono text-sm">$</span>
                  <input id="cashoutCashtag" type="text" placeholder="yourcashtag" class="w-full py-2.5 pl-8 pr-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold font-mono text-slate-900 focus:outline-none focus:border-emerald-600">
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">Recipient Name</label>
                <input id="cashoutCashAppName" type="text" placeholder="Full Legal Name on Cash App" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-600">
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">Cash App Phone or Email (Optional)</label>
                <input id="cashoutCashAppPhone" type="text" placeholder="(555) 000-0000 or email" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-600">
              </div>
            </div>

            <!-- ==================== METHOD 2: BANK ACCOUNT (ACH) FORM ==================== -->
            <div id="sectionBank" class="space-y-3 hidden">
              <div class="p-3 bg-slate-100 rounded-2xl border border-slate-200 flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-xl bg-[#00241b] text-[#ffd47f] font-bold flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-base">account_balance</span>
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-900">Bank Direct Deposit (ACH / Wire)</div>
                  <div class="text-[10px] text-slate-500">Transfers directly to any US checking or savings account</div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">9-Digit Routing Number (ABA)</label>
                <input id="cashoutRoutingNumber" type="text" maxlength="9" placeholder="121000358" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-[#00241b]">
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">Account Number</label>
                <input id="cashoutAccountNumber" type="text" maxlength="17" placeholder="98201948102" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-[#00241b]">
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-600 mb-1">Bank Name</label>
                  <input id="cashoutBankName" type="text" placeholder="Chase / BoA / Wells" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900">
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-slate-600 mb-1">Account Type</label>
                  <select id="cashoutAccountType" class="w-full py-2.5 px-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900">
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">Account Holder Full Name</label>
                <input id="cashoutBankHolder" type="text" placeholder="Beneficiary Legal Name" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900">
              </div>
            </div>

            <!-- ==================== METHOD 3: PAYPAL FORM ==================== -->
            <div id="sectionPayPal" class="space-y-3 hidden">
              <div class="p-3 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-xl bg-[#0070BA] text-white font-bold flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-base">payments</span>
                </div>
                <div>
                  <div class="text-xs font-bold text-blue-950">PayPal Balance Transfer</div>
                  <div class="text-[10px] text-blue-700">Instant deposit directly to your PayPal account</div>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">PayPal Account Email</label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">mail</span>
                  <input id="cashoutPayPalEmail" type="email" placeholder="you@example.com" class="w-full py-2.5 pl-9 pr-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0070BA]">
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">PayPal Account Holder Name</label>
                <input id="cashoutPayPalHolder" type="text" placeholder="Legal Name on PayPal" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0070BA]">
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-600 mb-1">PayPal Registered Phone (Optional)</label>
                <input id="cashoutPayPalPhone" type="text" placeholder="(555) 000-0000" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0070BA]">
              </div>
            </div>

            <!-- ==================== METHOD 4: DEBIT CARD FORM ==================== -->
            <div id="sectionCard" class="space-y-3 hidden">
              <div class="flex items-center justify-between">
                <label class="text-xs font-bold text-slate-900">Debit Card Credentials</label>
                <div class="flex space-x-1">
                  <span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">VISA</span>
                  <span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-mono">MC</span>
                </div>
              </div>

              <!-- Card Number -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-500 mb-1">16-Digit Card Number</label>
                <div class="relative">
                  <input id="cashoutCardNumber" type="text" maxlength="19" placeholder="4892 0000 0000 1234" oninput="formatCardInput(this)" class="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold font-mono tracking-wider fintech-input text-slate-900">
                  <span class="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 text-lg">credit_card</span>
                </div>
              </div>

              <!-- Expiration & CVV -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-500 mb-1">Exp Date (MM/YY)</label>
                  <input id="cashoutCardExp" type="text" maxlength="5" placeholder="08/28" oninput="formatExpInput(this)" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold font-mono text-center fintech-input text-slate-900">
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-slate-500 mb-1">CVV (3 Digits)</label>
                  <input id="cashoutCardCvv" type="password" maxlength="4" placeholder="â€¢â€¢â€¢" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold font-mono text-center fintech-input text-slate-900">
                </div>
              </div>

              <!-- Name on Card & ZIP -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-500 mb-1">Name on Card</label>
                  <input id="cashoutCardHolder" type="text" placeholder="Cardholder Name" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold fintech-input text-slate-900">
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-slate-500 mb-1">Billing ZIP Code</label>
                  <input id="cashoutCardZip" type="text" maxlength="5" placeholder="10020" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-center fintech-input text-slate-900">
                </div>
              </div>

              <div class="flex items-center space-x-2 text-xs pt-1">
                <input type="checkbox" id="saveCardOption" class="rounded text-emerald-800" checked>
                <label for="saveCardOption" class="text-slate-600 text-[11px]">Save card for instant one-click cashouts</label>
              </div>
            </div>

            <!-- Transfer Speed / Fee Pill -->
            <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
              <div class="flex items-center space-x-2">
                <span class="material-symbols-outlined text-emerald-700 text-lg">bolt</span>
                <span class="font-bold text-emerald-950" id="transferRailText">Cash App Instant Rail</span>
              </div>
              <span class="font-bold text-emerald-700">Free Â· $0.00 Fee</span>
            </div>

            <button type="submit" id="cashOutSubmitBtn" class="w-full py-3.5 rounded-2xl bg-[#00241b] text-white font-bold text-sm hover:bg-emerald-950 transition-all btn-pill shadow-lg shadow-emerald-950/20">
              Confirm &amp; Cash Out
            </button>
          </form>
        </div>
      </div>
        </div>
      </div>

      <!-- NOTIFICATIONS DRAWER -->
      <div id="notifications-drawer" class="fixed inset-0 z-50 hidden">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" onclick="window.toggleNotificationsDrawer(false)"></div>
        <div class="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col z-10 border-l border-slate-200">
          <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div class="flex items-center space-x-2">
              <span class="material-symbols-outlined text-emerald-400">notifications</span>
              <h3 class="text-sm font-bold">Activity Notifications</h3>
            </div>
            <button onclick="window.toggleNotificationsDrawer(false)" class="text-white/60 hover:text-white p-1">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div id="notifications-list" class="flex-1 overflow-y-auto divide-y divide-slate-100 p-2"></div>
        </div>
      </div>

      <!-- CONCIERGE MODAL -->
      <div id="concierge-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" onclick="window.closeConciergeModal()"></div>
        <div class="relative bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl z-10">
          <div class="flex justify-between items-start pb-4 border-b border-slate-100">
            <div class="flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" class="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-600/30">
              <div>
                <h3 class="text-base font-bold text-slate-900">Julian Vance</h3>
                <p class="text-xs text-slate-500 font-medium">Private Wealth Advisor Â· NYC Rockefeller Center</p>
                <div class="flex items-center space-x-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Direct Desk Line Active</span>
                </div>
              </div>
            </div>
            <button onclick="window.closeConciergeModal()" class="text-slate-400 hover:text-slate-700 p-1">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="py-4 space-y-3">
            <div class="grid grid-cols-2 gap-2 text-xs">
              <a href="tel:12125550198" class="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center flex flex-col items-center">
                <span class="material-symbols-outlined text-emerald-700 text-2xl mb-1">call</span>
                <span class="font-bold text-slate-900">Call Direct Desk</span>
                <span class="text-[10px] text-slate-500">(212) 555-0198</span>
              </a>
              <button onclick="window.showToast('Chat dispatch opened with Julian Vance.', 'info'); window.closeConciergeModal();" class="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center flex flex-col items-center">
                <span class="material-symbols-outlined text-emerald-700 text-2xl mb-1">chat</span>
                <span class="font-bold text-slate-900">Direct Chat</span>
                <span class="text-[10px] text-slate-500">&lt; 10 min response</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalHost);
  };

  // User Switcher
  window.toggleUserMenu = function () {
    const dd = document.getElementById('user-switcher-dropdown');
    dd?.classList.toggle('hidden');
  };

  window.switchUserAccount = function (userId) {
    document.getElementById('user-switcher-dropdown')?.classList.add('hidden');
    const u = window.FRB.switchUser(userId);
    window.showToast(`Switched account to ${u.name} (${u.handle})`);
    setTimeout(() => location.reload(), 300);
  };

  // Add Cash handlers
  window.openAddCashModal = function () {
    document.getElementById('add-cash-modal')?.classList.remove('hidden');
  };
  window.closeAddCashModal = function () {
    document.getElementById('add-cash-modal')?.classList.add('hidden');
  };

  window.submitAddCash = function () {
    const amt = parseFloat(document.getElementById('addCashAmountInput').value);
    if (!amt || amt <= 0) {
      window.showToast('Please enter an amount greater than $0', 'error');
      return;
    }
    try {
      window.FRB.addCash(amt);
      window.closeAddCashModal();
      window.showToast(`+$${amt.toFixed(2)} added instantly to your balance!`, 'success');
    } catch (e) {
      window.showToast(e.message, 'error');
    }
  };

  // Multi-Method Cash Out State & Handlers (Cash App, Bank, PayPal, Card)
  window.currentCashOutMethod = 'cashapp';

  window.selectCashOutMethod = function (method) {
    window.currentCashOutMethod = method;
    const methods = ['cashapp', 'bank', 'paypal', 'card'];

    methods.forEach(m => {
      const section = document.getElementById('section' + capitalize(m));
      const tab = document.getElementById('tabMethod' + capitalize(m));

      if (m === method) {
        if (section) section.classList.remove('hidden');
        if (tab) {
          if (m === 'cashapp') {
            tab.className = "py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-emerald-500 text-white font-bold shadow-sm";
          } else if (m === 'paypal') {
            tab.className = "py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-[#0070BA] text-white font-bold shadow-sm";
          } else if (m === 'bank') {
            tab.className = "py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-[#00241b] text-[#ffd47f] font-bold shadow-sm";
          } else {
            tab.className = "py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-slate-900 text-white font-bold shadow-sm";
          }
        }
      } else {
        if (section) section.classList.add('hidden');
        if (tab) {
          tab.className = "py-2 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all text-slate-600 hover:text-slate-900";
        }
      }
    });

    // Update rail text
    const railText = document.getElementById('transferRailText');
    if (railText) {
      if (method === 'cashapp') railText.innerText = 'Cash App Instant Rail';
      else if (method === 'paypal') railText.innerText = 'PayPal Direct Balance Rail';
      else if (method === 'bank') railText.innerText = 'Federal Reserve ACH Rail (1-2 Days)';
      else railText.innerText = 'Visa / Mastercard Instant Push';
    }
  };

  function capitalize(s) {
    if (s === 'cashapp') return 'CashApp';
    if (s === 'paypal') return 'PayPal';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  window.openCashOutModal = function () {
    const user = window.FRB.currentUser;
    const display = document.getElementById('cashOutAvailableDisplay');
    if (display) display.innerText = window.FRB.formatCurrency(user.balance);

    const amountInput = document.getElementById('cashOutAmountInput');
    if (amountInput) {
      amountInput.value = user.balance > 0 ? (user.balance > 50 ? '50.00' : user.balance.toFixed(2)) : '0.00';
    }

    // Pre-fill Cash App with user handle
    const cashtagInput = document.getElementById('cashoutCashtag');
    if (cashtagInput) cashtagInput.value = (user.handle || '').replace('$', '');
    const cashAppName = document.getElementById('cashoutCashAppName');
    if (cashAppName) cashAppName.value = user.name;

    // Pre-fill PayPal with user email
    const ppEmail = document.getElementById('cashoutPayPalEmail');
    if (ppEmail) ppEmail.value = user.email || '';
    const ppHolder = document.getElementById('cashoutPayPalHolder');
    if (ppHolder) ppHolder.value = user.name;

    // Pre-fill Bank with user name
    const bHolder = document.getElementById('cashoutBankHolder');
    if (bHolder) bHolder.value = user.name;
    const bName = document.getElementById('cashoutBankName');
    if (bName && !bName.value) bName.value = 'Chase Bank';
    const bRouting = document.getElementById('cashoutRoutingNumber');
    if (bRouting && !bRouting.value) bRouting.value = '121000358';

    // Pre-fill Card details
    const holderInput = document.getElementById('cashoutCardHolder');
    if (holderInput) holderInput.value = user.name;

    if (user.linkedCashoutCard) {
      const cNum = document.getElementById('cashoutCardNumber');
      if (cNum) cNum.value = user.linkedCashoutCard.fullNumber || user.linkedCashoutCard.number || '';
      const cExp = document.getElementById('cashoutCardExp');
      if (cExp) cExp.value = user.linkedCashoutCard.exp || '';
      const cZip = document.getElementById('cashoutCardZip');
      if (cZip) cZip.value = user.linkedCashoutCard.zip || '';
    }

    // Default to Cash App tab
    window.selectCashOutMethod(window.currentCashOutMethod || 'cashapp');

    document.getElementById('cash-out-modal')?.classList.remove('hidden');
  };

  window.closeCashOutModal = function () {
    document.getElementById('cash-out-modal')?.classList.add('hidden');
  };

  window.setCashOutPercent = function (pct) {
    const bal = window.FRB.currentUser.balance;
    const amt = (bal * pct).toFixed(2);
    document.getElementById('cashOutAmountInput').value = amt;
  };

  window.submitMultiMethodCashOut = function () {
    const amt = document.getElementById('cashOutAmountInput').value;
    const method = window.currentCashOutMethod || 'cashapp';

    const payload = {
      method,
      amount: amt
    };

    if (method === 'cashapp') {
      payload.cashtag = document.getElementById('cashoutCashtag').value;
      payload.cashAppName = document.getElementById('cashoutCashAppName').value;
      payload.cashAppPhone = document.getElementById('cashoutCashAppPhone').value;
    } else if (method === 'bank') {
      payload.routingNumber = document.getElementById('cashoutRoutingNumber').value;
      payload.accountNumber = document.getElementById('cashoutAccountNumber').value;
      payload.bankName = document.getElementById('cashoutBankName').value;
      payload.accountType = document.getElementById('cashoutAccountType').value;
      payload.bankHolder = document.getElementById('cashoutBankHolder').value;
    } else if (method === 'paypal') {
      payload.paypalEmail = document.getElementById('cashoutPayPalEmail').value;
      payload.paypalHolder = document.getElementById('cashoutPayPalHolder').value;
      payload.paypalPhone = document.getElementById('cashoutPayPalPhone').value;
    } else {
      // Debit Card
      payload.cardNumber = document.getElementById('cashoutCardNumber').value;
      payload.cardExp = document.getElementById('cashoutCardExp').value;
      payload.cardCvv = document.getElementById('cashoutCardCvv').value;
      payload.cardHolder = document.getElementById('cashoutCardHolder').value;
      payload.cardZip = document.getElementById('cashoutCardZip').value;
      payload.saveCard = document.getElementById('saveCardOption')?.checked ?? true;
    }

    try {
      const res = window.FRB.cashOut(payload);
      window.closeCashOutModal();
      window.showToast(`$${res.amount.toFixed(2)} cashed out successfully via ${res.method}!`, 'success');
      
      // Notify page to re-render
      window.dispatchEvent(new CustomEvent('frb_state_updated', { detail: window.FRB.state }));
    } catch (e) {
      window.showToast(e.message, 'error');
    }
  };

  window.submitCashOutWithCard = function () {
    window.currentCashOutMethod = 'card';
    window.submitMultiMethodCashOut();
  };

  window.openConciergeModal = function () {
    document.getElementById('concierge-modal')?.classList.remove('hidden');
  };
  window.closeConciergeModal = function () {
    document.getElementById('concierge-modal')?.classList.add('hidden');
  };

  window.toggleNotificationsDrawer = function (forceState) {
    const drawer = document.getElementById('notifications-drawer');
    if (!drawer) return;
    if (forceState !== undefined) {
      forceState ? drawer.classList.remove('hidden') : drawer.classList.add('hidden');
    } else {
      drawer.classList.toggle('hidden');
    }
    if (!drawer.classList.contains('hidden')) {
      const list = document.getElementById('notifications-list');
      const notifs = window.FRB.currentUser.notifications || [];
      if (notifs.length === 0) {
        list.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">No new notifications.</div>`;
        return;
      }
      list.innerHTML = notifs.map(n => `
        <div class="p-3 hover:bg-slate-50 transition-colors text-xs">
          <div class="font-bold text-slate-900">${n.title}</div>
          <div class="text-slate-600 mt-0.5">${n.message}</div>
          <div class="text-[10px] text-slate-400 mt-1">${n.time}</div>
        </div>
      `).join('');
    }
  };

  // Card input formatters
  window.formatCardInput = function (input) {
    let val = input.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    input.value = formatted;
  };

  window.formatExpInput = function (input) {
    let val = input.value.replace(/\D/g, '');
    if (val.length >= 2) {
      input.value = val.substring(0, 2) + '/' + val.substring(2, 4);
    } else {
      input.value = val;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.initGlobalModals();
  });
})();

