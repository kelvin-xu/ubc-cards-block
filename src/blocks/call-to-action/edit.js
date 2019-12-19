/**
 * BLOCK: Call To Action
 */


import classnames from "classnames"
import UAGBIcon from "./components/uagb-controls/UAGBIcon.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import Title from "./components/Title"
import Description from "./components/Description"
import CtaPositionClasses from "./classes"
import CTA from "./components/CTA"
import UAGB_Block_Icons from "./components/uagb-controls/block-icons"
import CtaStyle from "./inline-styles"
import renderSVG from "./components/uagb-controls/renderIcon"
import { BGSettings, generateBackgroundStyle } from "./components/background-images"

// Import all of our Text Options requirements.
import TypographyControl from "./components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "./components/typography/fontloader"

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	PanelColorSettings,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	TabPanel,
	Dashicon,
	ToggleControl,
	TextControl,
} = wp.components

let svg_icons = Object.keys( UAGBIcon )

const { Component, Fragment } = wp.element

class UAGBCallToAction extends Component {

	constructor() {
		super( ...arguments )
		this.toggleTarget     = this.toggleTarget.bind( this )
		this.setCtaIcon  	  = this.setCtaIcon.bind(this)
	}

	setCtaIcon(value) {
		this.props.setAttributes( { ctaIcon: value } )
	}

	/**
	 * Function Name: toggleTarget.
	 */
	toggleTarget() {
		const { ctaTarget } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { ctaTarget: ! ctaTarget } )
	}

	render() {

		const { className, setAttributes, attributes } = this.props

		// Setup the attributes.
		const {
			textAlign,
			titleColor,
			descColor,
			titleTag,
			titleFontSize,
			titleFontSizeType,
			titleFontSizeMobile,
			titleFontSizeTablet,
			titleFontFamily,
			titleFontWeight,
			titleFontSubset,
			titleLineHeightType,
			titleLineHeight,
			titleLineHeightTablet,
			titleLineHeightMobile,
			titleLoadGoogleFonts,
			descFontSize,
			descFontSizeType,
			descFontSizeMobile,
			descFontSizeTablet,
			descFontFamily,
			descFontWeight,
			descFontSubset,
			descLineHeightType,
			descLineHeight,
			descLineHeightTablet,
			descLineHeightMobile,
			descLoadGoogleFonts,
			separatorWidth,
			separatorHeight,
			titleSpace,
			separatorSpace,
			descSpace,
			ctaPosition,
			block_id,
			buttonAlign,
			ctaType,
			ctaText,
			ctaLink,
			ctaTarget,
			ctaIcon,
			ctaIconPosition,
			ctaIconSpace,
			ctaFontSize,
			ctaFontSizeType,
			ctaFontSizeMobile,
			ctaFontSizeTablet,
			ctaFontFamily,
			ctaFontWeight,
			ctaFontSubset,
			ctaLoadGoogleFonts,
			contentWidth,
			ctaBtnLinkColor,
			ctaBgHoverColor,
			ctaBgColor,
			ctaBtnVertPadding,
			ctaBtnHrPadding,
			ctaBorderStyle,
			ctaBorderColor,
			ctaBorderhoverColor,
			ctaBorderWidth,
			ctaBorderRadius,
			stack,
			ctaLeftSpace,
			ctaRightSpace,
			ctaLinkHoverColor,
			bgImages
		} = attributes
		
		const bgStyles = generateBackgroundStyle( bgImages );

		// Add CSS.
		var element = document.getElementById( "uagb-cta-style-" + this.props.clientId )
		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = CtaStyle( this.props )
		}

		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

		let loadCtaGoogleFonts
		let loadTitleGoogleFonts
		let loadDescGoogleFonts

		if( ctaLoadGoogleFonts == true ) {
					
			const ctaconfig = {
				google: {
					families: [ ctaFontFamily + ( ctaFontWeight ? ":" + ctaFontWeight : "" ) ],
				},
			}

			loadCtaGoogleFonts = (
				<WebfontLoader config={ ctaconfig }>
				</WebfontLoader>
			)
		}

		if( titleLoadGoogleFonts == true ) {
					
			const titleconfig = {
				google: {
					families: [ titleFontFamily + ( titleFontWeight ? ":" + titleFontWeight : "" ) ],
				},
			}

			loadTitleGoogleFonts = (
				<WebfontLoader config={ titleconfig }>
				</WebfontLoader>
			)
		}
		
		if( descLoadGoogleFonts == true ) {
					
			const descconfig = {
				google: {
					families: [ descFontFamily + ( descFontWeight ? ":" + descFontWeight : "" ) ],
				},
			}

			loadDescGoogleFonts = (
				<WebfontLoader config={ descconfig }>
				</WebfontLoader>
			)
		}

		// Icon properties.
		const cta_icon_props = {
			icons: svg_icons,
			value: ctaIcon,
			onChange: this.setCtaIcon,
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( "Select Icon" )
		}

		// CTA settings.
		const ctaSettings = (
			<PanelBody title={ __( "Button" ) } initialOpen={ false }>
				<SelectControl
					label={ __( "Type" ) }
					value={ ctaType }
					onChange={ ( value ) => setAttributes( { ctaType: value } ) }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "text", label: __( "Text" ) },
						{ value: "button", label: __( "Button" ) },
						{ value: "all", label: __( "Complete Box" ) },
					] }
				/>
				{ ( ctaType === "text" || ctaType === "button" ) &&
					<Fragment>
						<TextControl
							label= { __( "Text" ) }
							value= { ctaText }
							onChange={ value => setAttributes( { ctaText: value } ) }
						/>
						<TypographyControl
							label={ __( "Typography" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: ctaLoadGoogleFonts, label: __( "ctaLoadGoogleFonts" ) } }
							fontFamily = { { value: ctaFontFamily, label: __( "ctaFontFamily" ) } }
							fontWeight = { { value: ctaFontWeight, label: __( "ctaFontWeight" ) } }
							fontSubset = { { value: ctaFontSubset, label: __( "ctaFontSubset" ) } }
							fontSizeType = { { value: ctaFontSizeType, label: __( "ctaFontSizeType" ) } }
							fontSize = { { value: ctaFontSize, label: __( "ctaFontSize" ) } }
							fontSizeMobile = { { value: ctaFontSizeMobile, label: __( "ctaFontSizeMobile" ) } }
							fontSizeTablet= { { value: ctaFontSizeTablet, label: __( "ctaFontSizeTablet" ) } }							
							disableLineHeight = {true}
						/>
					</Fragment>
				}
				{ ( ctaType !== "none" ) &&
					<Fragment>
						<TextControl
							label= { __( "Link" ) }
							value= { ctaLink }
							onChange={ value => setAttributes( { ctaLink: value } ) }
						/>
						<ToggleControl
							label={ __( "Open in new Window" ) }
							checked={ ctaTarget }
							onChange={ this.toggleTarget }
						/>
					</Fragment>
				}
				<hr className="uagb-editor__separator" />
				<h2>{ __( "Button Icon" ) }</h2>
				{ ( ctaType !== "all" ) && ( ctaType !== "none" ) &&
					<Fragment>
						<FontIconPicker {...cta_icon_props} />
						{ ctaIcon != "" &&
							<Fragment>
								<SelectControl
									label={ __( "Icon Position" ) }
									value={ ctaIconPosition }
									onChange={ ( value ) => setAttributes( { ctaIconPosition: value } ) }
									options={ [
										{ value: "before", label: __( "Before Text" ) },
										{ value: "after", label: __( "After Text" ) },
									] }
								/>
								<RangeControl
									label={ __( "Icon Spacing" ) }
									value={ ctaIconSpace }
									onChange={ ( value ) => setAttributes( { ctaIconSpace: value } ) }
									min={ 0 }
									max={ 50 }
									beforeIcon=""
									allowReset
								/>
							</Fragment>
						}
					</Fragment>
				}

				{ ( ctaType == "button" ) && (
					<Fragment>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Button Padding (px)" ) }</h2>
						<RangeControl
							label={ UAGB_Block_Icons.vertical_spacing }
							className={ "uagb-margin-control" }
							value={ ctaBtnVertPadding }
							onChange={ ( value ) => setAttributes( { ctaBtnVertPadding: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
						/>
						<RangeControl
							label={ UAGB_Block_Icons.horizontal_spacing }
							className={ "uagb-margin-control" }
							value={ ctaBtnHrPadding }
							onChange={ ( value ) => setAttributes( { ctaBtnHrPadding: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
						/>
						<hr className="uagb-editor__separator" />
						<h2>{ __( "Button Border" ) }</h2>
						<SelectControl
							label={ __( "Style" ) }
							value={ ctaBorderStyle }
							onChange={ ( value ) => setAttributes( { ctaBorderStyle: value } ) }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "solid", label: __( "Solid" ) },
								{ value: "double", label: __( "Double" ) },
								{ value: "dashed", label: __( "Dashed" ) },
								{ value: "dotted", label: __( "Dotted" ) },
							] }
						/>
						{ ctaBorderStyle != "none" &&
							<Fragment>
								<RangeControl
									label={ __( "Width" ) }
									value={ ctaBorderWidth }
									onChange={ ( value ) => setAttributes( { ctaBorderWidth: value } ) }
									min={ 0 }
									max={ 10 }
									beforeIcon=""
									allowReset
								/>
								<RangeControl
									label={ __( "Rounded Corner" ) }
									value={ ctaBorderRadius }
									onChange={ ( value ) => setAttributes( { ctaBorderRadius: value } ) }
									min={ 0 }
									max={ 100 }
									beforeIcon=""
									allowReset
								/>
							</Fragment>
						}
					</Fragment>
				)
				}
				{ ( ctaType === "text" ) && <TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: "normal",
							title: __( "Normal" ),
							className: "uagb-normal-tab",
						},
						{
							name: "hover",
							title: __( "Hover" ),
							className: "uagb-hover-tab",
						},
					] }>
					{
						( tabName ) => {
							let cta_text_tab
							if( "normal" === tabName.name ) {
								cta_text_tab = cta_txt_color
							}else {
								cta_text_tab = cta_txt_hover_color
							}
							return <div>{ cta_text_tab }</div>
						}
					}
				</TabPanel>
				}

				{ ( ctaType === "button") &&
					<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: "normal",
								title: __( "Normal" ),
								className: "uagb-normal-tab",
							},
							{
								name: "hover",
								title: __( "Hover" ),
								className: "uagb-focus-tab",
							},
						] }>
						{
							( tabName ) => {
								let tabout
								if( "normal" === tabName.name ) {
									tabout = ctaNormalSettings
								}else {
									tabout = ctaHoverSettings
								}
								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				}
			</PanelBody>
		)

		const ctaNormalSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBtnLinkColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBtnLinkColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBtnLinkColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgColor: colorValue } ) }
					allowReset
				/>
				{ ( ctaBorderStyle !== "none" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBorderColor }} ></span></span></p>
				    <ColorPalette
				        value={ ctaBorderColor }
				        onChange={ ( colorValue ) => setAttributes( { ctaBorderColor: colorValue } ) }
				        allowReset
				    />
				    </Fragment>
				}
			</Fragment>
		)

		const ctaHoverSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkHoverColor }} ></span></span></p>
				<ColorPalette
					value={ ctaLinkHoverColor }
					onChange={ ( colorValue ) => setAttributes( { ctaLinkHoverColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgHoverColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgHoverColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgHoverColor: colorValue } ) }
					allowReset
				/>
				{ ( ctaBorderStyle !== "none" ) && <Fragment>
					<p className="uagb-setting-label">{ __( "Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBorderhoverColor }} ></span></span></p>
				    <ColorPalette
				        value={ ctaBorderhoverColor }
				        onChange={ ( colorValue ) => setAttributes( { ctaBorderhoverColor: colorValue } ) }
				        allowReset
				    />
				    </Fragment>
				}
			</Fragment>
		)

		const cta_txt_color = (
			<Fragment>
			    <p className="uagb-setting-label">{ __( "CTA Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBtnLinkColor }} ></span></span></p>
			    <ColorPalette
			        value={ ctaBtnLinkColor }
			        onChange={ ( colorValue ) => setAttributes( { ctaBtnLinkColor: colorValue } ) }
			        allowReset
			    />
			</Fragment>
		)

		const cta_txt_hover_color = (
			<Fragment>
			    <p className="uagb-setting-label">{ __( "CTA Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaLinkHoverColor }} ></span></span></p>
			    <ColorPalette
			        value={ ctaLinkHoverColor }
			        onChange={ ( colorValue ) => setAttributes( { ctaLinkHoverColor: colorValue } ) }
			        allowReset
			    />
			</Fragment>
		)

		// Typography settings.
		const TypographySettings = (
			<PanelBody title={ __( "Content" ) } initialOpen={ false }>
				<h2>{ __( "Heading" ) }</h2>
				<SelectControl
					label={ __( "Tag" ) }
					value={ titleTag }
					onChange={ ( value ) => setAttributes( { titleTag: value } ) }
					options={ [
						{ value: "h1", label: __( "H1" ) },
						{ value: "h2", label: __( "H2" ) },
						{ value: "h3", label: __( "H3" ) },
						{ value: "h4", label: __( "H4" ) },
						{ value: "h5", label: __( "H5" ) },
						{ value: "h6", label: __( "H6" ) },
					] }
				/>

				<TypographyControl
					label={ __( "Typography" ) }
					attributes = { attributes }
					setAttributes = { setAttributes }
					loadGoogleFonts = { { value: titleLoadGoogleFonts, label: __( "titleLoadGoogleFonts" ) } }
					fontFamily = { { value: titleFontFamily, label: __( "titleFontFamily" ) } }
					fontWeight = { { value: titleFontWeight, label: __( "titleFontWeight" ) } }
					fontSubset = { { value: titleFontSubset, label: __( "titleFontSubset" ) } }
					fontSizeType = { { value: titleFontSizeType, label: __( "titleFontSizeType" ) } }
					fontSize = { { value: titleFontSize, label: __( "titleFontSize" ) } }
					fontSizeMobile = { { value: titleFontSizeMobile, label: __( "titleFontSizeMobile" ) } }
					fontSizeTablet= { { value: titleFontSizeTablet, label: __( "titleFontSizeTablet" ) } }
					lineHeightType = { { value: titleLineHeightType, label: __( "titleLineHeightType" ) } }
					lineHeight = { { value: titleLineHeight, label: __( "titleLineHeight" ) } }
					lineHeightMobile = { { value: titleLineHeightMobile, label: __( "titleLineHeightMobile" ) } }
					lineHeightTablet= { { value: titleLineHeightTablet, label: __( "titleLineHeightTablet" ) } }
				/>
				<p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: titleColor }} ></span></span></p>
				<ColorPalette
					value={ titleColor }
					onChange={ ( colorValue ) => setAttributes( { titleColor: colorValue } ) }
					allowReset
				/>
				<hr className="uagb-editor__separator" />
				<h2>{ __( 'Description' ) }</h2>
				<TypographyControl
					label={ __( "Typography" ) }
					attributes = { attributes }
					setAttributes = { setAttributes }
					loadGoogleFonts = { { value: descLoadGoogleFonts, label: __( "descLoadGoogleFonts" ) } }
					fontFamily = { { value: descFontFamily, label: __( "descFontFamily" ) } }
					fontWeight = { { value: descFontWeight, label: __( "descFontWeight" ) } }
					fontSubset = { { value: descFontSubset, label: __( "descFontSubset" ) } }
					fontSizeType = { { value: descFontSizeType, label: __( "descFontSizeType" ) } }
					fontSize = { { value: descFontSize, label: __( "descFontSize" ) } }
					fontSizeMobile = { { value: descFontSizeMobile, label: __( "descFontSizeMobile" ) } }
					fontSizeTablet= { { value: descFontSizeTablet, label: __( "descFontSizeTablet" ) } }
					lineHeightType = { { value: descLineHeightType, label: __( "descLineHeightType" ) } }
					lineHeight = { { value: descLineHeight, label: __( "descLineHeight" ) } }
					lineHeightMobile = { { value: descLineHeightMobile, label: __( "descLineHeightMobile" ) } }
					lineHeightTablet= { { value: descLineHeightTablet, label: __( "descLineHeightTablet" ) } }
				/>
				<p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: descColor }} ></span></span></p>
				<ColorPalette
					value={ descColor }
					onChange={ ( colorValue ) => setAttributes( { descColor: colorValue } ) }
					allowReset
				/>
			</PanelBody>
		)

		const layouts = (
			<PanelBody title={ __( "Layout" ) } initialOpen={ false }>
				<SelectControl
					label={ __( "Button Position" ) }
					value={ ctaPosition }
					onChange={ ( value ) => setAttributes( { ctaPosition: value } ) }
					options={ [
						{ value: "right", label: __( "Normal" ) },
						{ value: "below-title", label: __( "Stack" ) },
					] }
				/>
				{ ( ctaPosition == "right" ) &&
						<SelectControl
							label={ __( "Stack on" ) }
							value={ stack }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "tablet", label: __( "Tablet" ) },
								{ value: "mobile", label: __( "Mobile" ) },
							] }
							help={ __( "Note: Choose on what breakpoint the CTA button will stack." ) }
							onChange={ ( value ) => setAttributes( { stack: value } ) }
						/>
				}

				{ ( ctaType === "text" || ctaType === "button" ) &&
					<Fragment>
						{ ctaPosition === "right" &&
							<RangeControl
								label={ __( "Content Width (%)" ) }
								value={ contentWidth }
								onChange={ ( value ) => setAttributes( { contentWidth: value } ) }
								min={ 0 }
								max={ 100 }
								initialPosition={70}
								allowReset
							/>
						}
					</Fragment>
				}

				{ ( ctaPosition && ctaPosition === "right"  ) && <SelectControl
					label={ __( "Verticle Alignment" ) }
					value={ buttonAlign }
					onChange={ ( value ) => setAttributes( { buttonAlign: value } ) }
					options={ [
						{ value: "top", label: __( "Top" ) },
						{ value: "middle", label: __( "Middle" ) },
					] }
				/>
				}
			</PanelBody>
		)

		// Global Controls.
		const inspect_control = (
			<InspectorControls>
				{ ( ctaType !== "all" ) && ( ctaType !== "none" ) && layouts }
				{ TypographySettings }
				{ ctaSettings }
				<BGSettings
					bgImages = { bgImages }
					setAttributes = { setAttributes }
				/>
			</InspectorControls>
		)

		// Get icon/Image components.
		let is_cta =  <CTA attributes={attributes} setAttributes = { setAttributes }/>
		// Get description components.
		const desc = (
			<div className = "uagb-cta-text-wrap">
				{ <Description attributes={attributes} setAttributes = { setAttributes } props = { this.props } />}
			</div>
		)

		// Get Title components.
		const title_text = (
			<div className = "uagb-cta__title-wrap">
				{ <Title attributes={attributes} setAttributes = { setAttributes } props = { this.props } /> }
			</div>
		)

		const output = (
			<div className = { classnames(
				"uagb-cta__content-wrap",
				...CtaPositionClasses( attributes ),
			) }>
				<div className = "uagb-cta__left-right-wrap">

					<div className = "uagb-cta__content">

						{ ctaPosition == "below-title"  &&
								<Fragment>
							     { title_text }
							     { desc }
							     { is_cta }
							    </Fragment>
						}

						{ ( ctaPosition == "right") &&
								<Fragment>
									{ title_text }
									{ desc }
								</Fragment>
						}

					</div>

					{ ( ctaPosition == "right") &&
								is_cta
					}
				</div>
			</div>
		)

		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( value ) => setAttributes( { textAlign: value } ) }
					/>
				</BlockControls>

				{inspect_control}
				<div
					className={ classnames(
						className,
						"uagb-cta__outer-wrap"
					) }
					id = { `uagb-cta-block-${this.props.clientId}` }
					style = { bgStyles }
				>
					{ ( ctaType == "all") &&
							<Fragment>
								<a href= "javascript:void(0)" className = "uagb-cta__block-link-wrap uagb-cta__link-to-all" rel ="noopener noreferrer" > </a>
								{output}
							</Fragment>
					}
					{ ( ctaType !== "all") && output }
				</div>
				{ loadCtaGoogleFonts }
				{ loadTitleGoogleFonts }
				{ loadDescGoogleFonts }
			</Fragment>
		)
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-cta-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}
}

export default UAGBCallToAction
