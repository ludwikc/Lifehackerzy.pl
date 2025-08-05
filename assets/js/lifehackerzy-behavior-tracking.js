/**
 * Lifehackerzy Simplified Behavior Tracking
 * Essential PYS patterns for detailed user behavior reporting
 * Minimal complexity, maximum tracking value
 */

// Configuration - Embedded for simplicity
const LIFEHACKERZY_CONFIG = {
    platforms: {
        facebook_pixel_id: '2656464611304919',
        gtm_container: 'GTM-MGRF3TBX', 
        plausible_domain: 'lifehackerzy.pl'
    },
    tracking: {
        session_timeout: 30 * 60 * 1000, // 30 minutes
        engagement_threshold: 15000, // 15 seconds
        scroll_threshold: 75 // 75% scroll depth
    }
};

// Main Behavior Tracker - Simplified PYS Architecture
class LifehackerzyBehaviorTracker {
    constructor() {
        this.sessionData = this.initializeSession();
        this.behaviorLog = [];
        this.engagementScore = 0;
        this.pageStartTime = Date.now();
        this.maxScroll = 0;
        this.emailInteractionStarted = false;
        
        this.init();
    }
    
    init() {
        this.trackPageView();
        this.setupEventListeners();
        this.setupEngagementTracking();
        
        if (LIFEHACKERZY_CONFIG.debug) {
            console.log('Lifehackerzy Behavior Tracking initialized');
        }
    }
    
    // Session Management - Refactored PYS Pattern
    updateSessionStorage(isNewSession) {
        if (isNewSession) {
            sessionStorage.setItem('lh_session_active', 'true');
            sessionStorage.setItem('lh_landing_page', window.location.href);
            sessionStorage.setItem('lh_page_count', '1');
        } else {
            const pageCount = parseInt(sessionStorage.getItem('lh_page_count') || '1') + 1;
            sessionStorage.setItem('lh_page_count', pageCount.toString());
        }
    }
    
    getSessionData() {
        return {
            session_id: sessionStorage.getItem('lh_session_id'),
            is_new_session: !sessionStorage.getItem('lh_session_active'),
            landing_page: sessionStorage.getItem('lh_landing_page'),
            page_count: parseInt(sessionStorage.getItem('lh_page_count') || '1')
        };
    }
    
    initializeSession() {
        const sessionId = this.getOrCreateSessionId();
        const isNewSession = !sessionStorage.getItem('lh_session_active');
        
        this.updateSessionStorage(isNewSession);
        
        return {
            session_id: sessionId,
            is_new_session: isNewSession,
            landing_page: sessionStorage.getItem('lh_landing_page'),
            page_count: parseInt(sessionStorage.getItem('lh_page_count')),
            traffic_source: this.getTrafficSource(),
            user_type: this.getUserType()
        };
    }
    
    getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('lh_session_id');
        if (!sessionId) {
            sessionId = 'lhs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
            sessionStorage.setItem('lh_session_id', sessionId);
        }
        return sessionId;
    }
    
    // Enhanced Data Collection - Refactored PYS Pattern
    getPageContextData() {
        return {
            page_title: document.title,
            page_url: window.location.href,
            page_referrer: document.referrer
        };
    }
    
    getSessionContextData() {
        return {
            session_id: this.sessionData.session_id,
            user_type: this.sessionData.user_type,
            page_count: this.sessionData.page_count,
            is_new_session: this.sessionData.is_new_session
        };
    }
    
    getTrafficContextData() {
        return {
            traffic_source: this.sessionData.traffic_source,
            utm_source: this.getUrlParameter('utm_source'),
            utm_medium: this.getUrlParameter('utm_medium'),
            utm_campaign: this.getUrlParameter('utm_campaign')
        };
    }
    
    getUserContextData() {
        return {
            viewport: window.innerWidth + 'x' + window.innerHeight,
            screen_resolution: screen.width + 'x' + screen.height,
            device_type: this.getDeviceType()
        };
    }
    
    getEngagementContextData() {
        return {
            time_on_page: Math.round((Date.now() - this.pageStartTime) / 1000),
            scroll_depth: this.maxScroll,
            engagement_score: this.engagementScore
        };
    }
    
    buildEventData(eventType, customData = {}) {
        const baseData = {
            ...this.getPageContextData(),
            ...this.getSessionContextData(),
            ...this.getTrafficContextData(),
            ...this.getUserContextData(),
            ...this.getEngagementContextData(),
            event_type: eventType,
            timestamp: Date.now()
        };
        
        return { ...baseData, ...customData };
    }
    
    // Page View Tracking - Enhanced PYS Style
    trackPageView() {
        const pageViewData = this.buildEventData('page_view', {
            landing_page: this.sessionData.landing_page,
            is_bounce_candidate: this.sessionData.page_count === 1
        });
        
        // Log behavior for session analysis
        this.behaviorLog.push({
            action: 'page_view',
            timestamp: Date.now(),
            data: pageViewData
        });
        
        // Send to platforms
        this.sendToFacebookPixel('ViewContent', pageViewData);
        this.sendToGoogleAnalytics('page_view', pageViewData);
    }
    
    // Email Form Behavior Analysis - Refactored PYS Feature
    cacheEmailElements() {
        this.emailElements = {
            input: jQuery('#emailInput'),
            button: jQuery('#submitButton')
        };
    }
    
    getEmailFieldData() {
        const email = this.emailElements.input.val();
        return {
            email: email,
            has_content: email && email.length > 0,
            email_length: email ? email.length : 0,
            appears_valid: email && email.includes('@')
        };
    }
    
    createEmailEventHandler(eventType) {
        return () => {
            const emailData = this.getEmailFieldData();
            this.trackEmailInteraction(eventType, emailData);
        };
    }
    
    setupEmailFormTracking() {
        this.cacheEmailElements();
        
        if (this.emailElements.input.length && this.emailElements.button.length) {
            // Focus event handler
            this.emailElements.input.on('focus', () => {
                this.emailInteractionStarted = true;
                this.trackEmailInteraction('email_field_focus');
            });
            
            // Reusable event handlers - DRY approach
            this.emailElements.input.on('blur', this.createEmailEventHandler('email_field_blur'));
            this.emailElements.input.on('input', this.createEmailEventHandler('email_field_input'));
            
            // Submit handler
            this.emailElements.button.on('click', (e) => {
                e.preventDefault();
                this.handleEmailSubmission();
            });
        }
    }
    
    trackEmailInteraction(action, extraData = {}) {
        const interactionData = this.buildEventData('email_interaction', {
            interaction_type: action,
            email_started: this.emailInteractionStarted,
            ...extraData
        });
        
        this.behaviorLog.push({
            action: action,
            timestamp: Date.now(),
            data: interactionData
        });
        
        // Send to platforms for funnel analysis
        this.sendToGoogleAnalytics('email_interaction', interactionData);
    }
    
    // Email Submission Refactored Functions
    validateEmailInput() {
        const email = jQuery('#emailInput').val();
        
        if (!email) {
            return { valid: false, error: 'empty_email', message: 'Proszę podać adres email' };
        }
        
        if (!this.isValidEmail(email)) {
            return { valid: false, error: 'invalid_email', message: 'Proszę podać prawidłowy adres email' };
        }
        
        return { valid: true, email: email };
    }
    
    trackEmailSubmissionAttempt(validation, email = null) {
        if (!validation.valid) {
            this.trackEmailInteraction('email_submit_failed', { reason: validation.error });
            return;
        }
        
        const submissionData = this.buildEventData('email_submit', {
            email_domain: email.split('@')[1],
            form_completion_time: Date.now() - this.pageStartTime,
            user_email: email
        });
        
        this.behaviorLog.push({
            action: 'email_submit',
            timestamp: Date.now(),
            data: submissionData
        });
        
        this.sendToFacebookPixel('Lead', submissionData);
        this.sendToGoogleAnalytics('generate_lead', submissionData);
    }
    
    redirectToCheckout(email) {
        const checkoutUrl = `https://app.easycart.pl/checkout/siadlak/lifehackerzy?email=${encodeURIComponent(email)}`;
        setTimeout(() => {
            window.location.href = checkoutUrl;
        }, 300);
    }
    
    handleEmailSubmission() {
        const validation = this.validateEmailInput();
        
        if (!validation.valid) {
            alert(validation.message);
            this.trackEmailSubmissionAttempt(validation);
            return;
        }
        
        this.trackEmailSubmissionAttempt(validation, validation.email);
        this.redirectToCheckout(validation.email);
    }
    
    // Course Purchase Click Tracking
    setupPurchaseTracking() {
        jQuery('a[href*="easycart.pl"]').on('click', (e) => {
            const clickedElement = jQuery(e.currentTarget);
            const purchaseData = this.buildEventData('course_purchase_click', {
                button_text: clickedElement.text().trim(),
                button_location: this.getElementLocation(clickedElement[0]),
                target_url: clickedElement.attr('href'),
                content_name: 'Hakowanie Produktywności',
                content_category: 'Online Course',
                value: 97,
                currency: 'PLN'
            });
            
            this.behaviorLog.push({
                action: 'course_purchase_click',
                timestamp: Date.now(),
                data: purchaseData
            });
            
            // Send e-commerce events
            this.sendToFacebookPixel('InitiateCheckout', purchaseData);
            this.sendToGoogleAnalytics('begin_checkout', purchaseData);
        });
    }
    
    // Engagement Tracking - PYS Pattern
    setupEngagementTracking() {
        // Scroll depth tracking
        let scrollTracked = false;
        jQuery(window).on('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            this.maxScroll = Math.max(this.maxScroll, scrollPercent);
            
            if (!scrollTracked && scrollPercent >= LIFEHACKERZY_CONFIG.tracking.scroll_threshold) {
                scrollTracked = true;
                this.trackEngagementMilestone('scroll_threshold', { scroll_percent: scrollPercent });
            }
        });
        
        // Time engagement tracking
        setTimeout(() => {
            this.trackEngagementMilestone('time_threshold', {
                time_on_page: LIFEHACKERZY_CONFIG.tracking.engagement_threshold / 1000
            });
        }, LIFEHACKERZY_CONFIG.tracking.engagement_threshold);
        
        // Social link clicks
        jQuery('a[href*="discord"], a[href*="linkedin"], a[href*="instagram"]').on('click', (e) => {
            const platform = this.getSocialPlatform(jQuery(e.currentTarget).attr('href'));
            this.trackSocialInteraction(platform);
        });
    }
    
    trackEngagementMilestone(milestone, data = {}) {
        this.engagementScore += 10; // Increase engagement score
        
        const engagementData = this.buildEventData('engagement_milestone', {
            milestone_type: milestone,
            total_engagement_score: this.engagementScore,
            ...data
        });
        
        this.behaviorLog.push({
            action: 'engagement_milestone',
            timestamp: Date.now(),
            data: engagementData
        });
        
        this.sendToGoogleAnalytics('user_engagement', engagementData);
    }
    
    trackSocialInteraction(platform) {
        const socialData = this.buildEventData('social_click', {
            social_platform: platform,
            click_context: 'footer_social_links'
        });
        
        this.behaviorLog.push({
            action: 'social_click',
            timestamp: Date.now(),
            data: socialData
        });
        
        this.sendToGoogleAnalytics('social_click', socialData);
    }
    
    // Platform Integration - Enhanced Error Handling
    generateEventId() {
        return 'lh_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }
    
    buildFacebookParameters(data) {
        return {
            content_name: data.page_title || data.content_name,
            content_category: data.content_category || 'Website',
            value: data.value,
            currency: data.currency || 'PLN',
            em: data.user_email // Advanced matching
        };
    }
    
    sendToFacebookPixel(eventName, data) {
        if (typeof window.fbq === 'undefined') {
            if (LIFEHACKERZY_CONFIG.debug) {
                console.warn('Facebook Pixel not loaded - event not sent:', eventName);
            }
            return false;
        }
        
        try {
            const fbParams = this.buildFacebookParameters(data);
            window.fbq('track', eventName, fbParams, {
                eventID: this.generateEventId()
            });
            
            if (LIFEHACKERZY_CONFIG.debug) {
                console.log('Facebook Pixel event sent:', eventName, fbParams);
            }
            
            return true;
        } catch (error) {
            console.error('Facebook Pixel tracking failed:', error);
            return false;
        }
    }
    
    buildGoogleAnalyticsParameters(data) {
        return {
            page_title: data.page_title,
            page_location: data.page_url,
            custom_parameter_1: data.session_id,
            custom_parameter_2: data.user_type,
            engagement_time_msec: data.time_on_page * 1000,
            value: data.value,
            currency: data.currency || 'PLN'
        };
    }
    
    sendToGoogleAnalytics(eventName, data) {
        if (typeof window.gtag === 'undefined' && typeof window.dataLayer === 'undefined') {
            if (LIFEHACKERZY_CONFIG.debug) {
                console.warn('Google Analytics not loaded - event not sent:', eventName);
            }
            return false;
        }
        
        try {
            let success = false;
            
            // Send via gtag if available
            if (window.gtag) {
                const gaParams = this.buildGoogleAnalyticsParameters(data);
                window.gtag('event', eventName, gaParams);
                success = true;
            }
            
            // Send via dataLayer for GTM
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'lifehackerzy_behavior',
                    behavior_event: eventName,
                    behavior_data: data,
                    session_id: data.session_id,
                    user_type: data.user_type,
                    engagement_score: data.engagement_score
                });
                success = true;
            }
            
            if (LIFEHACKERZY_CONFIG.debug && success) {
                console.log('Google Analytics event sent:', eventName, data);
            }
            
            return success;
        } catch (error) {
            console.error('Google Analytics tracking failed:', error);
            return false;
        }
    }
    
    // Event Listeners Setup
    setupEventListeners() {
        this.setupEmailFormTracking();
        this.setupPurchaseTracking();
        
        // Page unload - save session data
        jQuery(window).on('beforeunload', () => {
            this.saveSessionSummary();
        });
    }
    
    // Session Summary for Analysis
    saveSessionSummary() {
        const sessionSummary = {
            session_id: this.sessionData.session_id,
            total_time: Date.now() - this.pageStartTime,
            max_scroll: this.maxScroll,
            engagement_score: this.engagementScore,
            behavior_log: this.behaviorLog,
            page_count: this.sessionData.page_count,
            conversion_completed: this.behaviorLog.some(log => log.action === 'email_submit')
        };
        
        // Store for potential server-side analysis
        localStorage.setItem('lh_session_summary', JSON.stringify(sessionSummary));
    }
    
    // Utility Functions
    getTrafficSource() {
        if (this.getUrlParameter('utm_source')) return 'utm_campaign';
        if (document.referrer) {
            if (document.referrer.includes('google')) return 'google_organic';
            if (document.referrer.includes('facebook')) return 'facebook_social';
            if (document.referrer.includes('linkedin')) return 'linkedin_social';
            return 'referral';
        }
        return 'direct';
    }
    
    getUserType() {
        const hasVisitedBefore = localStorage.getItem('lh_returning_visitor');
        if (!hasVisitedBefore) {
            localStorage.setItem('lh_returning_visitor', 'true');
            return 'new_visitor';
        }
        return 'returning_visitor';
    }
    
    getDeviceType() {
        if (window.innerWidth <= 768) return 'mobile';
        if (window.innerWidth <= 1024) return 'tablet';
        return 'desktop';
    }
    
    getSocialPlatform(url) {
        if (url.includes('discord')) return 'discord';
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('instagram')) return 'instagram';
        return 'unknown';
    }
    
    getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            viewport_position: rect.top < window.innerHeight / 2 ? 'above_fold' : 'below_fold'
        };
    }
    
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Initialize when DOM is ready
jQuery(document).ready(function() {
    // Initialize behavior tracking
    window.lifehackerzyTracker = new LifehackerzyBehaviorTracker();
    
    // Debug mode helper
    if (window.location.search.includes('lh_debug=1')) {
        LIFEHACKERZY_CONFIG.debug = true;
        console.log('Lifehackerzy Debug Mode Enabled');
        console.log('Session Data:', window.lifehackerzyTracker.sessionData);
        
        // Expose tracker for console debugging
        window.lhDebug = window.lifehackerzyTracker;
    }
});