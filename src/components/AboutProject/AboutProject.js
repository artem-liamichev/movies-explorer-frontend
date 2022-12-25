import React from 'react';

function AboutProject() {

  return (
    <section className="about-project" id="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__content">
            <div className='about-project__description'>
                <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className='about-project__description'>
                <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>  
        <div className='about-project__bar'>
            <div className='bar'>
                <p className='barline barline_theme_green'>1 неделя</p>
                <p className='bar__subline'>Back-end</p>
            </div>
            <div className='bar'>
                <p className='barline barline_theme_grey'>4 недели</p>
                <p className='bar__subline'>Front-end</p>
            </div>          
        </div>
    </section>  );
}

export default AboutProject;
