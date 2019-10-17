import {addGlobalStyle, css} from '@pucelle/flit'
import {theme} from './theme'


addGlobalStyle(() => {
	let {mainColor, textColor, borderColor, errorColor, fontSize, lineHeight, borderRadius, focusBlurRadius, adjustByLineHeight: lh, adjustByFontSize: fs, backgroundColor} = theme

	return css`
	html{
		color: ${textColor};
		font-size: ${fontSize}px;
		line-height: ${lineHeight}px;
		background-color: ${backgroundColor};
	}

	h1{
		font-size: ${fs(68)}px;
		line-height: 1.2;
		font-weight: 700;
	}

	h2{
		font-size: ${fs(36)}px;
		line-height: 1.2;
		font-weight: 300;
	}

	h3{
		font-size: ${fs(26)}px;
		line-height: 1.2;
		font-weight: 400;
	}

	h4{
		font-size: ${fs(22)}px;
		line-height: 1.2;
		font-weight: 400;
	}

	h5{
		font-size: ${fs(18)}px;
		line-height: 1.2;
	}

	h6{
		font-size: ${fs(14)}px;
		line-height: 1.2;
	}

	button{
		display: inline-flex;
		justify-content: center;
		height: ${lineHeight}px;
		line-height: ${lineHeight - 2}px;
		border: 1px solid ${borderColor};
		color: ${textColor};
		border-radius: ${borderRadius}px;
		padding: 0 ${lh(16) + Math.max(0, (borderRadius - 5) / 2)}px;
		background: ${backgroundColor};
		text-align: center;
		cursor: pointer;
		vertical-align: top;
		
		&:hover, &:focus{
			border-color: #666;
			background-color: #666;
			color: #fff;
		}

		&:active{
			border-color: #000;
			background-color: #000;
			color: #fff;
		}

		&:focus{
			box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
		}

		f-icon, f-icon-loading{
			&:first-child{
				margin-right: ${lh(8)}px;
			}

			&:last-child{
				margin-left: ${lh(8)}px;
			}

			&:only-child{
				margin-left: 0;
				margin-right: 0;
			}
		}

		&[primary]{
			background: ${mainColor};
			border-color: ${mainColor};
			color: #fff;

			&:hover, &:focus{
				background: ${mainColor.darken(15)};
				border-color: ${mainColor.darken(15)};
			}
		
			&:active{
				background: ${mainColor.darken(30)};
				border-color: ${mainColor.darken(30)};
			}
		}

		&[flat]{
			border: none;
			padding-left: 0;
			padding-right: 0;
			line-height: ${lineHeight}px;

			&:hover, &:focus{
				background: none;
				color: ${textColor};
			}

			&:active{
				background: none;
			}

			&:focus{
				box-shadow: none;
			}
		}
	}

	a[primary]{
		color: ${mainColor};
	}

	label{
		font-weight: bold;
		font-size: ${fs(13)}px;

		&[required]{
			&::after{
				position: relative;
				content: '*';
				color: ${errorColor};
				margin-left: 2px;
				top: ${lh(-5)}px;
			}
		}

		f-icon{
			margin-left: 4px;
			color: ${textColor.highlight(20)};
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
		background: ${backgroundColor.highlight(5)};
	}

	::-webkit-scrollbar-thumb{
		background: ${backgroundColor.highlight(15)};

		&:hover{
			background: ${backgroundColor.highlight(25)};
		}

		&:active{
			background: ${backgroundColor.highlight(35)};
		}
	}
`})