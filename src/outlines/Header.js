import React, { useCallback } from 'react';
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { getCommonStates } from '../commons/contexts/CommonContext';
import { getUserContext } from '@/commons/contexts/UserInfoContext';
import Image from 'next/image';

const HeaderBox = styled.header`
  .site-top {

    background: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
    height: 45px;

    div {
      text-align: right;

      a {
        display: inline-block;
        line-height: 40px;
        margin-left: 10px;
        //font-size: ${({ theme }) => theme.fontSizes.normal}px;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.white};
        cursor: pointer;

        &.on {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  .logo-search {
    div {
      display: flex;
      justify-content: space-between;
      height: 150px;
      align-items: center;

      form {
        display: flex;
        height: 45px;
        width: 380px;

        button {
          width: 45px;
          background: ${({ theme }) => theme.colors.dark};
          border: 0;
          cursor: pointer;

          svg {
            color: ${({ theme }) => theme.colors.gray};
            font-size: 1.75rem;
          }
        }

        input[type='text'] {
          flex-grow: 1;
          border: 5px solid ${({ theme }) => theme.colors.dark};
          padding: 0 10px;
        }
      }
    }
  }
`;

const Header = () => {
  const { t } = useTranslation();
  const { showHeader } = getCommonStates();
  const {
    states: { isLogin, userInfo, isAdmin },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = getUserContext();
  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });
  }, [setIsLogin, setIsAdmin, setUserInfo]);

  return (
    showHeader && (
      <HeaderBox>
        <section className="site-top">
       
          <div className="layout-width">
            {isLogin ? (
              <>
                {/* 로그인 상태 */}
                <a>
                  {userInfo?.userName}({userInfo?.email}){t('님_로그인')}
                </a>
                <a onClick={onLogout}>{t('로그아웃')}</a>
                <a href="/mypage">{t('마이페이지')}</a>
              </>
            ) : (
              <>
                <a href="/member/join">{t('회원가입')}</a>
                <a href="/member/login">{t('로그인')}</a>
              </>
            )}
          </div>
        </section>
      </HeaderBox>
    )
  );
};

export default React.memo(Header);
