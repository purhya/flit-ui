import {addGlobalStyle, css} from 'flit'
import {theme} from './theme'


addGlobalStyle(() => {
	let {mainColor, textColor, borderColor, successColor, errorColor, fontSize, borderRadius, focusBlurRadius, lh, backgroundColor} = theme

	return css`
	html{
		color: ${textColor};
		font-size: ${fontSize}px;
		line-height: ${lh(30)}px;
		background-color: ${backgroundColor};
	}

	button{
		display: inline-flex;
		justify-content: center;
		height: ${lh(30)}px;
		line-height: ${lh(30) - 2}px;
		border: 1px solid ${borderColor};
		color: ${theme.darkenInLightMode(borderColor, 10)};
		border-radius: ${borderRadius}px;
		padding: 0 ${lh(15) + Math.max(0, (borderRadius - 5) / 2)}px;
		background: ${backgroundColor};
		text-align: center;
		cursor: pointer;
		vertical-align: top;
		
		&:hover, &:focus{
			border-color: ${mainColor};
			color: ${mainColor};
		}

		&:focus:not([borderless]){
			box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
		}
	
		&:active{
			border-color: ${mainColor.darken(10)};
			color: ${mainColor.darken(10)};
			background: ${mainColor.alpha(0.05)};
		}
	
		f-icon, f-icon-loading{
			&:first-child{
				margin-left: ${lh(-3)}px;
				margin-right: ${lh(4)}px;
			}

			&:last-child{
				margin-left: ${lh(2)}px;
				margin-right: ${lh(-4)}px;
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
			padding-left: ${lh(10)}px;
			padding-right: ${lh(10)}px;
			line-height: ${lh(30)}px;

			&:active{
				background: none;
			}
		}

		&[round]{
			width: ${lh(30)}px;
			border-radius: ${lh(15)}px;
			padding: 0;
			font-size: 0;

			f-icon, f-icon-loading{
				margin-left: auto;
				margin-right: auto;
			}
		}
	}

	[type=text], [type=password], [type=number], [type=email]{
		height: ${lh(30)}px;
		padding: 0 0 0 ${lh(8)}px;
	}
	
	textarea{
		padding: ${lh(4)}px ${lh(8)}px;
		line-height: ${lh(22)}px;
	}
	
	[type=text], [type=password], [type=number], [type=email], textarea{
		border: none;
		box-shadow: inset 0 -1px 0 0 ${borderColor};
		background: ${theme.darkenInLightMode(backgroundColor, 10)};
		
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


	::-webkit-scrollbar{
		height: 10px;
		width: 10px;
		background: ${theme.darkenInLightMode(backgroundColor, 5)};
	}

	::-webkit-scrollbar-thumb{
		background: ${theme.darkenInLightMode(backgroundColor, 15)};

		&:hover{
			background: ${theme.darkenInLightMode(backgroundColor, 25)};
		}

		&:active{
			background: ${theme.darkenInLightMode(backgroundColor, 35)};
		}
	}
`})