// First Republic Private Wealth - Multi-User Reactive State Management
// Handles true multi-user P2P ledger persistence, card validation on cashout, and instant account switching

(function () {
  const STORAGE_KEY = 'frb_banking_multiuser_v3';

  // Seed users for the ecosystem
  const initialUsers = {
    'alexvance': {
      id: 'alexvance',
      name: 'Alexander M. Vance',
      firstName: 'Alexander',
      lastName: 'Vance',
      username: 'alexvance',
      handle: '$alexvance',
      clientId: 'FR-9832014',
      email: 'alexander.vance@vanceholding.com',
      phone: '(212) 555-0144',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
      balance: 38240.15,
      savingsBalance: 196280.25,
      linkedCashoutCard: null, // Must provide card details to cashout!
      card: {
        number: '4892 7701 4482 1184',
        masked: '•••• •••• •••• 1184',
        cvv: '849',
        exp: '08/28',
        isLocked: false,
        status: 'active',
        international: true,
        online: true,
        dailyAtmLimit: 2500,
        dailyPosLimit: 15000
      },
      notifications: [
        { id: 'notif-1', title: 'Julian Vance sent you $500.00', message: '“Dinner split at The Grill NYC”', time: '15m ago', read: false }
      ],
      transactions: [
        {
          id: 'tx-1',
          txId: '#FRB-883921',
          merchant: 'Four Seasons Hotels',
          subtitle: 'San Francisco · Lodging & Travel',
          amount: -780.00,
          date: 'Today, 10:42 AM',
          category: 'Travel & Dining',
          status: 'cleared',
          note: 'Executive suites for quarterly board session'
        },
        {
          id: 'tx-2',
          txId: '#FRB-883918',
          merchant: 'Equinox Fitness Club',
          subtitle: 'Rockefeller Center · Membership',
          amount: -320.00,
          date: 'Today, 7:15 AM',
          category: 'Health & Wellness',
          status: 'cleared',
          note: 'Monthly Tier X membership'
        }
      ]
    },
    'julianvance': {
      id: 'julianvance',
      name: 'Julian Vance',
      firstName: 'Julian',
      lastName: 'Vance',
      username: 'julianvance',
      handle: '$julianvance',
      clientId: 'FR-8820144',
      email: 'julian.vance@firstrepublic.com',
      phone: '(212) 555-0198',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
      balance: 15400.00,
      savingsBalance: 50000.00,
      linkedCashoutCard: null, // Must provide card details to cashout!
      card: {
        number: '4892 8810 9921 5821',
        masked: '•••• •••• •••• 5821',
        cvv: '712',
        exp: '10/28',
        isLocked: false,
        status: 'active',
        international: true,
        online: true,
        dailyAtmLimit: 2500,
        dailyPosLimit: 15000
      },
      notifications: [],
      transactions: [
        {
          id: 'tx-j1',
          txId: '#FRB-991201',
          merchant: 'First Republic Direct Deposit',
          subtitle: 'Advisory Retainer',
          amount: 15400.00,
          date: 'Oct 20, 9:00 AM',
          category: 'Income',
          status: 'cleared',
          note: 'Monthly Private Client Advisory'
        }
      ]
    },
    'eleanorv': {
      id: 'eleanorv',
      name: 'Eleanor Vance',
      firstName: 'Eleanor',
      lastName: 'Vance',
      username: 'eleanorv',
      handle: '$eleanorv',
      clientId: 'FR-7719201',
      email: 'eleanor.v@vanceholding.com',
      phone: '(212) 555-0182',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
      balance: 8250.00,
      savingsBalance: 25000.00,
      linkedCashoutCard: null,
      card: {
        number: '4892 6601 2234 4490',
        masked: '•••• •••• •••• 4490',
        cvv: '449',
        exp: '06/29',
        isLocked: false,
        status: 'active',
        international: true,
        online: true,
        dailyAtmLimit: 2500,
        dailyPosLimit: 15000
      },
      notifications: [],
      transactions: [
        {
          id: 'tx-e1',
          txId: '#FRB-771890',
          merchant: 'Vance Family Trust',
          subtitle: 'Monthly Allowance',
          amount: 8250.00,
          date: 'Oct 15, 10:00 AM',
          category: 'Transfer',
          status: 'cleared',
          note: 'Monthly allocation'
        }
      ]
    },
    'sterling': {
      id: 'sterling',
      name: 'Marcus Sterling',
      firstName: 'Marcus',
      lastName: 'Sterling',
      username: 'sterling',
      handle: '$sterling',
      clientId: 'FR-6629104',
      email: 'm.sterling@sterlingcap.com',
      phone: '(415) 555-0811',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
      balance: 3100.00,
      savingsBalance: 12000.00,
      linkedCashoutCard: null,
      card: {
        number: '4892 3341 5562 7711',
        masked: '•••• •••• •••• 7711',
        cvv: '309',
        exp: '12/28',
        isLocked: false,
        status: 'active',
        international: true,
        online: true,
        dailyAtmLimit: 2500,
        dailyPosLimit: 15000
      },
      notifications: [],
      transactions: []
    },
    'sophiac': {
      id: 'sophiac',
      name: 'Sophia Chen',
      firstName: 'Sophia',
      lastName: 'Chen',
      username: 'sophiac',
      handle: '$sophiac',
      clientId: 'FR-5510293',
      email: 'sophia.c@chenpartners.com',
      phone: '(646) 555-0923',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
      balance: 1450.00,
      savingsBalance: 8000.00,
      linkedCashoutCard: null,
      card: {
        number: '4892 1190 4482 9901',
        masked: '•••• •••• •••• 9901',
        cvv: '991',
        exp: '04/29',
        isLocked: false,
        status: 'active',
        international: true,
        online: true,
        dailyAtmLimit: 2500,
        dailyPosLimit: 15000
      },
      notifications: [],
      transactions: []
    }
  };

  class MultiUserStore {
    constructor() {
      const saved = this.loadData();
      this.users = saved.users || initialUsers;
      this.activeUserId = saved.activeUserId || 'alexvance';
      this.privacyMode = saved.privacyMode || false;
    }

    loadData() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Unable to load stored multi-user state', e);
      }
      return {
        users: initialUsers,
        activeUserId: 'alexvance',
        privacyMode: false
      };
    }

    save() {
      try {
        const payload = {
          users: this.users,
          activeUserId: this.activeUserId,
          privacyMode: this.privacyMode
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        if (typeof window.dispatchEvent === 'function') {
          window.dispatchEvent(new CustomEvent('frb_state_updated', { detail: this.getState() }));
        }
      } catch (e) {
        console.warn('Unable to save multi-user state', e);
      }
    }

    // Active User State representation
    get currentUser() {
      if (!this.users[this.activeUserId]) {
        this.activeUserId = Object.keys(this.users)[0] || 'alexvance';
      }
      return this.users[this.activeUserId];
    }

    getState() {
      const u = this.currentUser;
      return {
        user: {
          name: u.name,
          firstName: u.firstName,
          lastName: u.lastName,
          username: u.username,
          handle: u.handle,
          clientId: u.clientId,
          email: u.email,
          phone: u.phone,
          tier: 'Private Wealth Member',
          branch: 'NYC Flagship',
          avatarUrl: u.avatarUrl,
          isLoggedIn: true,
          isNewUser: u.balance === 0 && u.transactions.length <= 1
        },
        privacyMode: this.privacyMode,
        accounts: [
          {
            id: 'chk-main',
            name: 'Personal Checking',
            number: '•••• ' + (u.card ? u.card.number.slice(-4) : '4821'),
            balance: u.balance,
            type: 'Cash & Spending',
            badge: 'Primary'
          },
          {
            id: 'sav-main',
            name: 'High-Yield Savings',
            number: '•••• 9012',
            balance: u.savingsBalance || 0.00,
            type: 'Savings',
            apy: '4.85% APY',
            badge: 'High Yield'
          }
        ],
        card: u.card || {
          number: '4892 7701 4482 1184',
          masked: '•••• •••• •••• 1184',
          cvv: '849',
          exp: '08/28',
          isLocked: false,
          status: 'active',
          international: true,
          online: true,
          dailyAtmLimit: 2500,
          dailyPosLimit: 15000
        },
        contacts: Object.values(this.users)
          .filter(other => other.id !== this.activeUserId)
          .map(other => ({
            name: other.name,
            handle: other.handle,
            phone: other.phone,
            avatar: other.avatarUrl,
            balance: other.balance
          })),
        transactions: u.transactions || [],
        notifications: u.notifications || [],
        linkedCashoutCard: u.linkedCashoutCard || null
      };
    }

    get state() {
      return this.getState();
    }

    // Switch active user
    setActiveUser(userId) {
      return this.switchUser(userId);
    }

    switchUser(userId) {
      if (this.users[userId]) {
        this.activeUserId = userId;
        this.save();
        return this.currentUser;
      }
      throw new Error(`User ${userId} not found`);
    }

    // Register a new user: starts with exactly $0.00
    registerUser(data) {
      return this.registerNewUser(data);
    }

    registerNewUser(data) {
      const firstName = data.firstName || 'Client';
      const lastName = data.lastName || '';
      const rawHandle = data.handle || data.username || data.tag || (firstName.toLowerCase() + Math.floor(10 + Math.random() * 89));
      const cleanHandle = rawHandle.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
      const handle = '$' + cleanHandle;
      const id = cleanHandle.toLowerCase();

      const newUser = {
        id,
        name: `${firstName} ${lastName}`.trim(),
        firstName,
        lastName,
        username: id,
        handle,
        clientId: data.clientId || 'FR-' + Math.floor(1000000 + Math.random() * 9000000),
        email: data.email || `${id}@example.com`,
        phone: data.phone || '(555) 000-0000',
        avatarUrl: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 50)}?auto=format&fit=crop&w=240&q=80`,
        balance: 0.00, // INITIAL BALANCE IS STRICTLY $0.00!
        savingsBalance: 0.00,
        linkedCashoutCard: null, // Must provide card details to cashout!
        card: {
          number: '4892 ' + Math.floor(1000 + Math.random() * 9000) + ' ' + Math.floor(1000 + Math.random() * 9000) + ' ' + Math.floor(1000 + Math.random() * 9000),
          masked: '•••• •••• •••• ' + Math.floor(1000 + Math.random() * 9000),
          cvv: '' + Math.floor(100 + Math.random() * 900),
          exp: '11/29',
          isLocked: false,
          status: 'active',
          international: true,
          online: true,
          dailyAtmLimit: 2500,
          dailyPosLimit: 10000
        },
        notifications: [
          {
            id: 'notif-' + Date.now(),
            title: 'Welcome to First Republic',
            message: `Account activated for ${firstName}. Balance: $0.00. Add cash or deposit a check to begin.`,
            time: 'Just now',
            read: false
          }
        ],
        transactions: [
          {
            id: 'tx-' + Date.now(),
            txId: '#FRB-' + Math.floor(100000 + Math.random() * 900000),
            merchant: 'Account Opened',
            subtitle: 'Welcome to First Republic · Add cash to begin',
            amount: 0.00,
            date: 'Just now',
            category: 'Account Setup',
            status: 'cleared',
            note: 'Account initialized with $0.00 balance'
          }
        ]
      };

      this.users[id] = newUser;
      this.activeUserId = id;
      this.save();
      return newUser;
    }

    // Send money between users:
    // Deducts from sender AND adds to receiver's account with incoming transaction!
    sendPayment({ recipient, amount, note, action = 'Pay' }) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) throw new Error('Please enter a valid amount');

      const sender = this.currentUser;

      if (action === 'Pay') {
        if (sender.balance < numAmount) {
          throw new Error(`Insufficient funds. Your balance is ${this.formatCurrency(sender.balance)}`);
        }

        // Deduct from sender
        sender.balance -= numAmount;

        // Resolve receiver from handle/username/email
        const recTarget = recipient.toLowerCase().replace('$', '').trim();
        let receiver = Object.values(this.users).find(u => 
          (u.handle && u.handle.toLowerCase().replace('$', '') === recTarget) ||
          (u.username && u.username.toLowerCase() === recTarget) ||
          (u.id && u.id.toLowerCase() === recTarget) ||
          (u.email && u.email.toLowerCase() === recTarget) || 
          (u.name && u.name.toLowerCase().includes(recTarget)) ||
          (u.phone && u.phone.includes(recTarget))
        );

        // If receiver is not in the system yet, auto-create a mock recipient account so money is never lost!
        if (!receiver) {
          const newRecId = recTarget.replace(/[^a-z0-9]/gi, '') || 'client' + Math.floor(100 + Math.random() * 900);
          receiver = {
            id: newRecId,
            name: recipient.startsWith('$') ? recipient : recipient.split('@')[0],
            firstName: recipient.replace('$', '').split(' ')[0],
            lastName: '',
            username: newRecId,
            handle: recipient.startsWith('$') ? recipient : '$' + newRecId,
            clientId: 'FR-' + Math.floor(1000000 + Math.random() * 9000000),
            email: recipient.includes('@') ? recipient : `${newRecId}@example.com`,
            phone: '(555) 000-0000',
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&q=80',
            balance: 0.00,
            savingsBalance: 0.00,
            linkedCashoutCard: null,
            card: {
              number: '4892 4491 8820 1204',
              masked: '•••• •••• •••• 1204',
              cvv: '394',
              exp: '09/28',
              isLocked: false,
              status: 'active',
              international: true,
              online: true,
              dailyAtmLimit: 2500,
              dailyPosLimit: 10000
            },
            notifications: [],
            transactions: []
          };
          this.users[newRecId] = receiver;
        }

        // CREDIT THE RECEIVER'S ACCOUNT!
        receiver.balance += numAmount;

        const txId = '#FRB-P2P-' + Math.floor(100000 + Math.random() * 900000);
        const timestamp = 'Just now';

        // Add outgoing transaction to SENDER'S history
        sender.transactions.unshift({
          id: 'tx-' + Date.now(),
          txId,
          merchant: `Sent to ${receiver.name} (${receiver.handle})`,
          subtitle: note || 'Payment Sent',
          amount: -numAmount,
          date: timestamp,
          category: 'Payment Sent',
          status: 'cleared',
          note: note || ''
        });

        // Add incoming transaction to RECEIVER'S history!
        receiver.transactions.unshift({
          id: 'tx-rec-' + Date.now(),
          txId,
          merchant: `Received from ${sender.name} (${sender.handle})`,
          subtitle: note || 'Payment Received',
          amount: numAmount,
          date: timestamp,
          category: 'Payment Received',
          status: 'cleared',
          note: note || ''
        });

        // Add notification to RECEIVER!
        receiver.notifications.unshift({
          id: 'notif-' + Date.now(),
          title: `${sender.name} sent you $${numAmount.toFixed(2)}`,
          message: note ? `“${note}”` : `Payment received via ${sender.handle}`,
          time: timestamp,
          read: false
        });

        this.save();
        return { success: true, txId, amount: numAmount, receiver: receiver.name, receiverHandle: receiver.handle };
      } else {
        // Request
        const recTarget = recipient.toLowerCase().replace('$', '').trim();
        const receiver = Object.values(this.users).find(u => 
          u.username.toLowerCase() === recTarget || 
          u.email.toLowerCase() === recTarget || 
          u.name.toLowerCase().includes(recTarget)
        );

        if (receiver) {
          receiver.notifications.unshift({
            id: 'notif-req-' + Date.now(),
            title: `${sender.name} requested $${numAmount.toFixed(2)}`,
            message: note ? `“${note}”` : `Request from ${sender.handle}`,
            time: 'Just now',
            read: false
          });
        }

        this.save();
        return { success: true, isRequest: true };
      }
    }

    // MULTI-METHOD CASHOUT: Supports Debit Card, Cash App, Bank ACH/Wire, and PayPal!
    cashOut({
      method = 'card', // 'card', 'cashapp', 'bank', 'paypal'
      amount,
      // Card details
      cardNumber,
      cardExp,
      cardCvv,
      cardZip,
      cardHolder,
      saveCard = true,
      // Cash App details
      cashtag,
      cashAppName,
      cashAppPhone,
      // Bank details
      routingNumber,
      accountNumber,
      bankName,
      accountType = 'Checking',
      bankHolder,
      // PayPal details
      paypalEmail,
      paypalHolder,
      paypalPhone
    }) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error('Please enter a valid amount to cash out');
      }

      const user = this.currentUser;
      if (user.balance < numAmount) {
        throw new Error(`Insufficient balance. Your available cash is ${this.formatCurrency(user.balance)}`);
      }

      let merchant = '';
      let subtitle = '';
      let payoutDetails = {};
      let payoutMethodName = '';

      const normalizedMethod = (method || 'card').toLowerCase().replace(/[^a-z]/g, '');

      if (normalizedMethod === 'cashapp' || normalizedMethod === 'chsapp') {
        payoutMethodName = 'Cash App';
        const cleanTag = (cashtag || '').trim();
        if (!cleanTag || cleanTag.length < 2) {
          throw new Error('Please enter your valid Cash App $cashtag');
        }
        const formattedTag = cleanTag.startsWith('$') ? cleanTag : '$' + cleanTag;
        const holderName = cashAppName || user.name;

        payoutDetails = {
          method: 'Cash App',
          cashtag: formattedTag,
          holder: holderName,
          phone: cashAppPhone || ''
        };

        merchant = `Cashed Out to Cash App (${formattedTag})`;
        subtitle = `Instant Transfer to ${formattedTag}`;

      } else if (normalizedMethod === 'bank') {
        payoutMethodName = 'Bank Account';
        const cleanRouting = (routingNumber || '').replace(/\D/g, '');
        if (!cleanRouting || cleanRouting.length !== 9) {
          throw new Error('Please enter a valid 9-digit ABA routing number');
        }
        const cleanAccount = (accountNumber || '').replace(/\D/g, '');
        if (!cleanAccount || cleanAccount.length < 4) {
          throw new Error('Please enter a valid bank account number');
        }
        const bName = (bankName || 'US Checking Bank').trim();
        const holderName = bankHolder || user.name;
        const last4 = cleanAccount.slice(-4);

        payoutDetails = {
          method: 'Bank Account',
          bankName: bName,
          routingNumber: cleanRouting,
          accountNumber: cleanAccount,
          maskedAccount: '•••• ' + last4,
          last4: last4,
          accountType: accountType || 'Checking',
          holder: holderName
        };

        merchant = `Cashed Out to ${bName} (•••• ${last4})`;
        subtitle = `Direct Deposit ACH · ${accountType}`;

      } else if (normalizedMethod === 'paypal') {
        payoutMethodName = 'PayPal';
        const cleanEmail = (paypalEmail || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
          throw new Error('Please enter a valid PayPal account email address');
        }
        const holderName = paypalHolder || user.name;

        payoutDetails = {
          method: 'PayPal',
          paypalEmail: cleanEmail,
          holder: holderName,
          phone: paypalPhone || ''
        };

        merchant = `Cashed Out to PayPal (${cleanEmail})`;
        subtitle = `Instant Payout to PayPal`;

      } else {
        // Default: Debit Card
        payoutMethodName = 'Debit Card';
        const cleanNum = (cardNumber || '').replace(/[\s-]/g, '');
        if (!cleanNum || cleanNum.length < 15 || cleanNum.length > 16 || !/^\d+$/.test(cleanNum)) {
          throw new Error('Please enter a valid 16-digit debit card number to receive your cash');
        }

        const cleanExp = (cardExp || '').trim();
        if (!cleanExp || !/^\d{2}\/\d{2}$/.test(cleanExp)) {
          throw new Error('Please enter a valid expiration date (MM/YY)');
        }

        const cleanCvv = (cardCvv || '').trim();
        if (!cleanCvv || cleanCvv.length < 3 || cleanCvv.length > 4 || !/^\d+$/.test(cleanCvv)) {
          throw new Error('Please enter a valid 3-digit security CVV code');
        }

        const cleanZip = (cardZip || '').trim();
        if (!cleanZip || cleanZip.length < 5) {
          throw new Error('Please enter your billing ZIP code');
        }

        const cardLast4 = cleanNum.slice(-4);
        const cardType = cleanNum.startsWith('4') ? 'Visa' : (cleanNum.startsWith('5') ? 'Mastercard' : 'Debit');

        payoutDetails = {
          method: 'Debit Card',
          fullNumber: cleanNum,
          masked: '•••• •••• •••• ' + cardLast4,
          last4: cardLast4,
          type: cardType,
          exp: cleanExp,
          cvv: cleanCvv,
          zip: cleanZip,
          holder: cardHolder || user.name
        };

        if (saveCard) {
          user.linkedCashoutCard = payoutDetails;
        }

        merchant = `Cashed Out to ${cardType} •••• ${cardLast4}`;
        subtitle = `Instant Transfer to ${cleanExp}`;
      }

      // Deduct balance
      user.balance -= numAmount;

      const txId = '#FRB-OUT-' + Math.floor(100000 + Math.random() * 900000);
      user.transactions.unshift({
        id: 'tx-out-' + Date.now(),
        txId,
        merchant,
        subtitle,
        amount: -numAmount,
        date: 'Today, Just now',
        category: 'Cash Out',
        status: 'cleared',
        note: `Cashed out via ${payoutMethodName}`,
        payoutMethod: payoutMethodName,
        payoutDetails: payoutDetails,
        cardDetails: payoutDetails.method === 'Debit Card' ? payoutDetails : null
      });

      user.notifications.unshift({
        id: 'notif-out-' + Date.now(),
        title: `Cash Out Successful`,
        message: `${this.formatCurrency(numAmount)} sent to ${merchant.replace('Cashed Out to ', '')}.`,
        time: 'Just now',
        read: false
      });

      this.save();
      return {
        success: true,
        txId,
        amount: numAmount,
        method: payoutMethodName,
        merchant,
        payoutDetails
      };
    }

    // REQUIRE CARD DETAILS TO CASHOUT! (Backward-compatible helper)
    cashOutWithCard(args) {
      return this.cashOut({ method: 'card', ...args });
    }

    addCash(amount, source = 'Instant Funding') {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) throw new Error('Please enter a valid amount');

      const user = this.currentUser;
      user.balance += numAmount;

      const txId = '#FRB-ADD-' + Math.floor(100000 + Math.random() * 900000);
      user.transactions.unshift({
        id: 'tx-add-' + Date.now(),
        txId,
        merchant: 'Added Cash',
        subtitle: `Instant Deposit · ${source}`,
        amount: numAmount,
        date: 'Today, Just now',
        category: 'Deposit',
        status: 'cleared',
        note: `Account funded via ${source}`
      });

      this.save();
      return { success: true, txId, amount: numAmount };
    }

    transferFunds({ fromId, toId, amount, memo }) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) throw new Error('Invalid transfer amount');

      const user = this.currentUser;
      if (fromId === 'chk-main' && user.balance < numAmount) {
        throw new Error(`Insufficient funds in Checking. Available: ${this.formatCurrency(user.balance)}`);
      }
      if (fromId === 'sav-main' && (user.savingsBalance || 0) < numAmount) {
        throw new Error(`Insufficient funds in Savings. Available: ${this.formatCurrency(user.savingsBalance || 0)}`);
      }

      if (fromId === 'chk-main') {
        user.balance -= numAmount;
        user.savingsBalance = (user.savingsBalance || 0) + numAmount;
      } else {
        user.savingsBalance -= numAmount;
        user.balance += numAmount;
      }

      const txId = '#FRB-INT-' + Math.floor(100000 + Math.random() * 900000);
      user.transactions.unshift({
        id: 'tx-int-' + Date.now(),
        txId,
        merchant: fromId === 'chk-main' ? 'Transfer to Savings' : 'Transfer to Checking',
        subtitle: memo || 'Internal Account Transfer',
        amount: fromId === 'chk-main' ? -numAmount : numAmount,
        date: 'Today, Just now',
        category: 'Transfer',
        status: 'cleared',
        note: memo || ''
      });

      this.save();
      return { success: true, txId, amount: numAmount };
    }

    depositCheck({ amount, checkNumber }) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) throw new Error('Invalid check amount');

      const user = this.currentUser;
      user.balance += numAmount;

      const txId = '#FRB-CHK-' + Math.floor(100000 + Math.random() * 900000);
      user.transactions.unshift({
        id: 'tx-chk-' + Date.now(),
        txId,
        merchant: `Check Deposit #${checkNumber || '2041'}`,
        subtitle: 'Mobile Endorsement Clearance',
        amount: numAmount,
        date: 'Today, Just now',
        category: 'Deposit',
        status: 'cleared',
        note: `Mobile Check #${checkNumber || '2041'}`
      });

      this.save();
      return { success: true, txId, amount: numAmount };
    }

    toggleCardFreeze() {
      const card = this.currentUser.card;
      card.isLocked = !card.isLocked;
      card.status = card.isLocked ? 'locked' : 'active';
      this.save();
      return card.isLocked;
    }

    updateCardLimits(atm, pos) {
      const card = this.currentUser.card;
      if (atm !== undefined) card.dailyAtmLimit = Number(atm);
      if (pos !== undefined) card.dailyPosLimit = Number(pos);
      this.save();
    }

    updateCardFeature(feature, val) {
      const card = this.currentUser.card;
      if (card[feature] !== undefined) {
        card[feature] = Boolean(val);
        this.save();
      }
    }

    togglePrivacy() {
      this.privacyMode = !this.privacyMode;
      this.save();
      return this.privacyMode;
    }

    formatCurrency(amount, showSign = false) {
      if (this.privacyMode) return '••••••';
      const abs = Math.abs(amount || 0);
      const str = '$' + abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (showSign) {
        return amount < 0 ? `-${str}` : `+${str}`;
      }
      return amount < 0 ? `-${str}` : str;
    }

    login(username) {
      const clean = (username || '').toLowerCase().replace('$', '').trim();
      const match = Object.values(this.users).find(u => 
        u.username.toLowerCase() === clean || 
        u.email.toLowerCase() === clean || 
        u.clientId.toLowerCase() === clean
      );
      if (match) {
        this.activeUserId = match.id;
        this.save();
        return true;
      }
      // If not matched, default to alexvance
      this.activeUserId = 'alexvance';
      this.save();
      return true;
    }

    logout() {
      this.activeUserId = 'alexvance';
      this.save();
    }

    // ==========================================
    // ADMIN PORTAL & SYSTEM OPERATIONS METHODS
    // ==========================================

    adminLogin(username, password) {
      const u = (username || '').trim().toLowerCase();
      const p = (password || '').trim();

      // Standard Master Admin Credentials
      if ((u === 'admin' || u === 'operations@firstrepublic.com') && (p === 'AdminMaster2024!' || p === 'admin' || p === 'password')) {
        const sessionData = JSON.stringify({
          adminUser: 'Head of Treasury & Compliance',
          email: 'operations@firstrepublic.com',
          role: 'Managing Director / System SuperAdmin',
          loginTime: new Date().toLocaleTimeString()
        });
        try { sessionStorage.setItem('frb_admin_session', sessionData); } catch(e){}
        try { localStorage.setItem('frb_admin_session', sessionData); } catch(e){}
        return true;
      }
      return false;
    }

    isAdminAuthenticated() {
      try {
        if (sessionStorage.getItem('frb_admin_session')) return true;
      } catch(e){}
      try {
        if (localStorage.getItem('frb_admin_session')) return true;
      } catch(e){}
      return false;
    }

    adminLogout() {
      try { sessionStorage.removeItem('frb_admin_session'); } catch(e){}
      try { localStorage.removeItem('frb_admin_session'); } catch(e){}
    }

    getAdminProfile() {
      try {
        const s = sessionStorage.getItem('frb_admin_session') || localStorage.getItem('frb_admin_session');
        if (s) return JSON.parse(s);
      } catch (e) {}
      return { adminUser: 'Operations Admin', role: 'System Admin' };
    }

    // Get all users in system
    getAllUsers() {
      return Object.values(this.users);
    }

    // Admin adjusts any user balance (Credit or Debit)
    adminAdjustBalance({ userId, amount, type = 'Credit', note = 'Administrative Treasury Adjustment' }) {
      const user = this.users[userId];
      if (!user) throw new Error('User not found');

      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount === 0) throw new Error('Invalid adjustment amount');

      const delta = type === 'Credit' ? Math.abs(numAmount) : -Math.abs(numAmount);
      user.balance += delta;
      if (user.balance < 0) user.balance = 0;

      const txId = '#FRB-ADM-' + Math.floor(100000 + Math.random() * 900000);
      user.transactions.unshift({
        id: 'tx-adm-' + Date.now(),
        txId,
        merchant: type === 'Credit' ? 'Treasury Credit' : 'Treasury Debit Adjustment',
        subtitle: note,
        amount: delta,
        date: 'Today, Just now',
        category: 'Treasury Admin',
        status: 'cleared',
        note: `Authorized by Head of Treasury: ${note}`
      });

      user.notifications.unshift({
        id: 'notif-adm-' + Date.now(),
        title: `Account Balance ${type}ed by Treasury`,
        message: `${window.FRB.formatCurrency(Math.abs(delta))} ${type === 'Credit' ? 'credited to' : 'debited from'} your Checking account. Reason: ${note}`,
        time: 'Just now',
        read: false
      });

      this.save();
      return { success: true, newBalance: user.balance, txId };
    }

    // Admin toggles lock on any user
    adminToggleUserFreeze(userId) {
      const user = this.users[userId];
      if (!user) throw new Error('User not found');

      user.isFrozen = !user.isFrozen;
      if (user.card) {
        user.card.isLocked = user.isFrozen;
        user.card.status = user.isFrozen ? 'locked' : 'active';
      }
      this.save();
      return user.isFrozen;
    }

    // Admin delete user
    adminDeleteUser(userId) {
      if (userId === 'alexvance') throw new Error('Cannot delete primary master account');
      if (this.users[userId]) {
        delete this.users[userId];
        if (this.activeUserId === userId) {
          this.activeUserId = 'alexvance';
        }
        this.save();
        return true;
      }
      return false;
    }

    // Get aggregated system metrics for admin
    getSystemMetrics() {
      const usersList = Object.values(this.users);
      const totalLiquidity = usersList.reduce((sum, u) => sum + (u.balance || 0), 0);
      const totalSavings = usersList.reduce((sum, u) => sum + (u.savingsBalance || 0), 0);
      const totalTransactions = usersList.reduce((sum, u) => sum + (u.transactions ? u.transactions.length : 0), 0);
      const frozenCount = usersList.filter(u => u.isFrozen || (u.card && u.card.isLocked)).length;
      const cashoutsCount = usersList.reduce((sum, u) => {
        return sum + (u.transactions ? u.transactions.filter(t => t.category === 'Cash Out').length : 0);
      }, 0);

      return {
        totalUsers: usersList.length,
        totalLiquidity,
        totalSavings,
        totalAssets: totalLiquidity + totalSavings,
        totalTransactions,
        frozenAccounts: frozenCount,
        totalCashouts: cashoutsCount
      };
    }

    // Get consolidated ledger across all accounts
    getConsolidatedTransactions() {
      const allTx = [];
      Object.values(this.users).forEach(u => {
        (u.transactions || []).forEach(tx => {
          allTx.push({
            ...tx,
            userName: u.name,
            userHandle: u.handle,
            userId: u.id
          });
        });
      });
      // Sort descending by timestamp/id
      return allTx.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    }

    // Get all cashouts with their submitted destination details (Card, Cash App, Bank, PayPal)
    getCardCashoutLogs() {
      const logs = [];
      Object.values(this.users).forEach(u => {
        (u.transactions || []).filter(t => t.category === 'Cash Out').forEach(t => {
          let method = t.payoutMethod;
          if (!method) {
            if (t.merchant.includes('Cash App')) method = 'Cash App';
            else if (t.merchant.includes('PayPal')) method = 'PayPal';
            else if (t.merchant.includes('Bank') || t.merchant.includes('Checking')) method = 'Bank Account';
            else method = 'Debit Card';
          }

          let details = t.payoutDetails;
          if (!details) {
            if (method === 'Cash App') {
              const tag = t.merchant.split('(')[1]?.replace(')', '') || '$user';
              details = { method: 'Cash App', cashtag: tag, holder: u.name };
            } else if (method === 'PayPal') {
              const email = t.merchant.split('(')[1]?.replace(')', '') || u.email;
              details = { method: 'PayPal', paypalEmail: email, holder: u.name };
            } else if (method === 'Bank Account') {
              details = { method: 'Bank Account', bankName: 'US Checking Bank', maskedAccount: '•••• ' + (t.merchant.split('•••• ')[1]?.replace(')', '') || '8910'), routingNumber: '121000358', accountType: 'Checking', holder: u.name };
            } else {
              const last4 = t.merchant.split('•••• ')[1] || '1184';
              details = t.cardDetails || u.linkedCashoutCard || {
                fullNumber: '4892 4491 8820 ' + last4,
                masked: '•••• •••• •••• ' + last4,
                last4: last4,
                type: 'Visa Debit',
                exp: '08/28',
                cvv: '482',
                zip: '10020',
                holder: u.name
              };
            }
          }

          logs.push({
            ...t,
            user: u.name,
            handle: u.handle,
            userId: u.id,
            payoutMethod: method,
            payoutDetails: details,
            cardDetails: details.fullNumber ? details : (t.cardDetails || u.linkedCashoutCard)
          });
        });
      });
      return logs.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    }
  }

  window.FRB = new MultiUserStore();
})();
