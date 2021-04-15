import React from 'react';
import styles from './index.less';
import {SearchOutlined} from '@ant-design/icons';
import Swiper from '@/components/Swiper';
import classnames from 'classnames';
import Util from '@/utils/util';
import Storage from '@/utils/storage';

class Index extends React.PureComponent {
    state = {
        keyword: '',
    };

    render() {
        let {autocomplete = [], wrapperClassName} = this.props;
        let {keyword} = this.state;
        let hasKeyword = !!`${keyword}`.length;
        let hasAutocomplete = hasKeyword && autocomplete.length;
        let that = this;
        return (
            <div className={classnames(styles.component, wrapperClassName, {
                [styles.inputed]: hasKeyword,
                [styles.autocompleted]: hasAutocomplete,
            })}>
                <div className={styles.logoWrapper}>
                    <Swiper images={this.getImages()} active={this.getActive()} onChange={this.onChangeSearchEngine}/>
                    {/*<a href="#" className={styles.logo}/>*/}
                </div>
                <form className={styles.search} action={'#'}>
                    <input type="text" autoCorrect="off" autoComplete="off" autoCapitalize="off"
                           value={keyword}
                           placeholder="搜索.."
                           onChange={this.onChangeKeyword}
                           className={styles.input}/>
                    <div className={styles.btns}>
                        <input type="button" className={classnames(styles.clean)} value="X"
                               onClick={this.onClickClean}/>
                        <button type="submit" className={styles.submit} onClick={that.onClickSearch.bind(that)}><SearchOutlined/>
                        </button>
                    </div>
                    <div className={classnames(styles.autocomplete, {
                        [styles.show]: hasAutocomplete,
                    })}>
                        {(autocomplete).map((phrase, index) =>
                            (<div key={index} className={styles.autocompleteItem}
                                  onClick={that.onClickAutocomplete.bind(that, phrase)}>{phrase}</div>),
                        )}
                    </div>
                </form>
            </div>
        );
    }

    getActive = () => {
        return Storage.getActive() || 0;
    };

    setActive = (active) => {
        Storage.setActive(active);
    };

    getImages = () => {
        let {searchEngine} = this.props;
        return (searchEngine || []).map(({logo}) => `${Util.getSearchLogo()[logo]}`);
    };

    onClickClean = () => {
        this.setState({
            keyword: '',
        });
    };

    onChangeKeyword = (e) => {
        let {onChangeKeyword} = this.props;
        let keyword = e.target.value;
        this.setState({
            keyword,
        }, () => {
            onChangeKeyword(keyword)
        });
    };

    onClickAutocomplete = (keyword) => {
        this.setState({
            keyword,
        });
        this.openSearchResult(keyword);
    };

    onClickSearch = (e) => {
        e.preventDefault();
        let {keyword} = this.state;
        this.openSearchResult(keyword);
    };

    onChangeSearchEngine = (index) => {
        this.setActive(index);
    };

    openSearchResult = (query) => {
        let {searchEngine} = this.props;
        let active = this.getActive();
        if (!query) {
            return;
        }
        let searchEngineUrl = searchEngine[active]?.url;
        let url = `${searchEngineUrl}`.replace(`$\{query\}`, query);
        window.location.href = `${url}`;
    };
}

export default Index;
