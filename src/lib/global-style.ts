import {addGlobalStyle, css} from 'flit'
import {theme} from './theme'


addGlobalStyle(() => {
	let {mainColor, textColor, successColor, errorColor, fontSize, borderRadius, lpx} = theme

	return css`
	html{
		color: ${textColor};
		font-size: ${fontSize}px;
		line-height: ${lpx(30)}px;
	}

	button{
		display: inline-flex;
		justify-content: center;
		height: ${lpx(30)}px;
		line-height: ${lpx(30) - 2}px;
		border: 1px solid ${textColor.lighten(30)};
		color: ${textColor.lighten(20)};
		border-radius: ${borderRadius}px;
		padding: 0 ${lpx(15) + Math.max(0, (borderRadius - 5) / 2)}px;
		background: #fff;
		text-align: center;
		cursor: pointer;
		vertical-align: top;
		
		&:hover, &:focus{
			border-color: ${mainColor};
			color: ${mainColor};
		}

		&:focus:not([borderless]){
			box-shadow: 0 0 3px ${mainColor};
		}
	
		&:active{
			border-color: ${mainColor.darken(10)};
			color: ${mainColor.darken(10)};
			background: ${mainColor.alpha(0.05)};
		}
	
		f-icon, f-icon-loading{
			&:first-child{
				margin-left: ${lpx(-3)}px;
				margin-right: ${lpx(4)}px;
			}

			&:last-child{
				margin-left: ${lpx(2)}px;
				margin-right: ${lpx(-4)}px;
			}
		}

		&[filled]{
			background: ${mainColor};
			border-color: ${mainColor};
			color: #fff;

			&:hover, &:focus{
				background: ${mainColor.darken(5)};
				border-color: ${mainColor.darken(5)};
			}
		
			&:active{
				background: ${mainColor.darken(10)};
				border-color: ${mainColor.darken(10)};
			}
		}

		&[borderless]{
			border: none;
			padding-left: ${lpx(10)}px;
			padding-right: ${lpx(10)}px;
			line-height: ${lpx(30)}px;

			&:active{
				background: none;
			}
		}

		&[round]{
			width: ${lpx(30)}px;
			border-radius: ${lpx(15)}px;
			padding: 0;
			font-size: 0;

			f-icon, f-icon-loading{
				margin-left: auto;
				margin-right: auto;
			}
		}
	}

	[type=text], [type=number], [type=email]{
		height: ${lpx(30)}px;
		padding: 0 0 0 ${lpx(8)}px;
	}
	
	textarea{
		padding: ${lpx(4)}px ${lpx(8)}px;
		line-height: ${lpx(22)}px;
	}
	
	[type=text], [type=number], [type=email], textarea{
		border: none;
		box-shadow: inset 0 -1px 0 0 ${textColor.lighten(30)};
		background: #e5e5e5;
		
		&:focus{
			box-shadow: inset 0 -1px 0 0 ${mainColor};
		}
	}
	
	.f-touched{
		&.f-valid, :valid{
			box-shadow: inset 0 -2px 0 0 ${successColor};
		}

		.f-invalid, :invalid{
			box-shadow: inset 0 -2px 0 0 ${errorColor};
		}
	}

	.fade-enter, .fade-leave{
		transition: opacity 0.2s ease-out;
	}
	
	.fade-enter-from, .fade-leave-to{
		opacity: 0;
	}
	
	.fade-enter-to, .fade-leave-from{
		opacity: 1;
	}
`})