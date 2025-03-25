// 语言切换功能
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'en'; // 默认语言为英语

    // 从 localStorage 获取保存的语言设置
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }

    // 语言切换按钮点击事件
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('preferredLanguage', currentLang);
        updateLanguage(currentLang);
    });

    // 更新页面语言
    function updateLanguage(lang) {
        // 更新所有带有 data-lang 属性的元素
        document.querySelectorAll('[data-lang-en]').forEach(element => {
            element.textContent = element.getAttribute(`data-lang-${lang}`);
        });

        // 更新页面标题
        document.title = document.querySelector('title').getAttribute(`data-lang-${lang}`);

        // 更新 HTML 语言属性
        document.documentElement.lang = lang;

        // 更新语言切换按钮文本
        langToggle.querySelector('span').textContent = lang === 'en' ? '中文' : 'English';

        // 更新 meta 标签
        updateMetaTags(lang);
    }

    // 更新 meta 标签
    function updateMetaTags(lang) {
        // 更新 description
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (lang === 'zh') {
            descriptionMeta.setAttribute('lang', 'zh');
            descriptionMeta.content = '您的终极游戏目的地 - 在线玩精彩游戏';
        } else {
            descriptionMeta.removeAttribute('lang');
            descriptionMeta.content = 'Your ultimate gaming destination - Play exciting games online';
        }

        // 更新 keywords
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (lang === 'zh') {
            keywordsMeta.setAttribute('lang', 'zh');
            keywordsMeta.content = '在线游戏, 游戏, 多人游戏, 浏览器游戏';
        } else {
            keywordsMeta.removeAttribute('lang');
            keywordsMeta.content = 'online games, gaming, multiplayer games, browser games';
        }

        // 更新 alternate 链接
        const alternateLinks = document.querySelectorAll('link[rel="alternate"]');
        alternateLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (lang === 'zh') {
                link.setAttribute('href', href + '?lang=zh');
            } else {
                link.setAttribute('href', href.replace('?lang=zh', ''));
            }
        });
    }

    // 评分系统功能
    const ratingContainers = document.querySelectorAll('.rating');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('i');
        const gameId = container.closest('.game-card').querySelector('h3').textContent;
        
        // 从 localStorage 获取保存的评分
        const savedRating = localStorage.getItem(`rating_${gameId}`);
        if (savedRating) {
            updateStars(stars, parseInt(savedRating));
        }

        // 为每个星星添加点击事件
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const rating = index + 1;
                localStorage.setItem(`rating_${gameId}`, rating);
                updateStars(stars, rating);
            });

            // 添加悬停效果
            star.addEventListener('mouseover', () => {
                updateStars(stars, index + 1, true);
            });

            star.addEventListener('mouseout', () => {
                const savedRating = localStorage.getItem(`rating_${gameId}`);
                if (savedRating) {
                    updateStars(stars, parseInt(savedRating));
                } else {
                    updateStars(stars, 0);
                }
            });
        });
    });

    // 更新星星显示
    function updateStars(stars, rating, isHover = false) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.className = 'fas fa-star';
            } else if (index === rating && !isHover) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
}); 