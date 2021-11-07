import React, { Component } from "react";
import { numberFormat } from './NumberFormat'

export class Calculator extends Component {
	static displayName = Calculator.name;

	constructor(props) {
		super(props);
		this.state = {
			chiSoMoi: 100,
			chiSoCu: 1,
			bangGiaDien: [[1678, 50], [1734, 50], [2014, 100], [2536, 100], [2834, 100], [2927, 0]],
			tienBac1: 0,
			tienBac2: 0,
			tienBac3: 0,
			tienBac4: 0,
			tienBac5: 0,
			tienBac6: 0
		};
		this.TinhToan = this.TinhToan.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			...this.state,
			[e.target.name]: Number(e.target.value)
		});
	}

	componentDidMount() {
		this.TinhToan();
	}

	tinhTienDien() {
		return this.state.tienBac1 + this.state.tienBac2 + this.state.tienBac3 + this.state.tienBac4 + this.state.tienBac5 + this.state.tienBac6;
	}

	tinhTienThue() {
		return Math.round(this.tinhTienDien() * 0.1);
	}

	tinhTongTien() {
		return this.tinhTienDien() + this.tinhTienThue();
	}

	render() {
		return (
			<div className="text-center">
				<h1 className="display-4"></h1>

				<div className="card">
					<div className="card-header">
						<h2>Công cụ tính tiền điện</h2>
					</div>
					<div className="card-body">
						<div className="form-group">
							<label htmlFor="chiSoMoi">Chỉ số mới</label>
							<input className="form-control" name="chiSoMoi" placeholder="Nhập chỉ số mới" value={this.state.chiSoMoi} onChange={this.handleChange} type="number" min="0" />
						</div>
						<div className="form-group">
							<label htmlFor="chiSoCu">Chỉ số cũ</label>
							<input className="form-control" name="chiSoCu" placeholder="Nhập chỉ số cũ" value={this.state.chiSoCu} onChange={this.handleChange} type="number" min="0" />
						</div>
						<button className="btn btn-primary" onClick={this.TinhToan}>Tính toán</button>
						<br />
						<br />
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Bậc thang</th>
									<th scope="col">Đơn giá theo <br /> QĐ 648/QĐ-BCT (đồng/kWh)</th>
									<th scope="col">Sản lượng (kWh)</th>
									<th scope="col">Thành tiền (đồng)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">Bậc thang 1</th>
									<td>{numberFormat(this.state.bangGiaDien[0][0])}</td>
									<td>{this.state.bangGiaDien[0][1]}</td>
									<td>{numberFormat(this.state.tienBac1)}</td>
								</tr>
								<tr>
									<th scope="row">Bậc thang 2</th>
									<td>{numberFormat(this.state.bangGiaDien[1][0])}</td>
									<td>{this.state.bangGiaDien[1][1]}</td>
									<td>{numberFormat(this.state.tienBac2)}</td>
								</tr>
								<tr>
									<th scope="row">Bậc thang 3</th>
									<td>{numberFormat(this.state.bangGiaDien[2][0])}</td>
									<td>{this.state.bangGiaDien[2][1]}</td>
									<td>{numberFormat(this.state.tienBac3)}</td>
								</tr>
								<tr>
									<th scope="row">Bậc thang 4</th>
									<td>{numberFormat(this.state.bangGiaDien[3][0])}</td>
									<td>{this.state.bangGiaDien[3][1]}</td>
									<td>{numberFormat(this.state.tienBac4)}</td>
								</tr>
								<tr>
									<th scope="row">Bậc thang 5</th>
									<td>{numberFormat(this.state.bangGiaDien[4][0])}</td>
									<td>{this.state.bangGiaDien[4][1]}</td>
									<td>{numberFormat(this.state.tienBac5)}</td>
								</tr>
								<tr>
									<th scope="row">Bậc thang 6</th>
									<td>{numberFormat(this.state.bangGiaDien[5][0])}</td>
									<td>{this.state.bangGiaDien[5][1]}</td>
									<td>{numberFormat(this.state.tienBac6)}</td>
								</tr>
							</tbody>
						</table>
						<br />
						<div className="alert alert-secondary" role="alert">
							<p>Tiền điện chưa thuế (1): <strong>{numberFormat(this.tinhTienDien())}</strong></p>
							<p>Tiền thuế GTGT (10%) (2): <strong>{numberFormat(this.tinhTienThue())}</strong></p>
							<p>Tổng cộng phải thanh toán (3)=(1)+(2): <strong>{numberFormat(this.tinhTongTien())}</strong></p>
						</div>
					</div>
				</div>
			</div >
		);
	}

	async TinhToan() {
		if (this == null)
			alert('Lỗi!');
		else if (this.state.chiSoMoi < this.state.chiSoCu)
			alert('Chỉ số mới không được nhỏ hơn chỉ số cũ');
		else if (this.state.chiSoCu < 0 || this.state.chiSoMoi < 0)
			alert('Chỉ số mới hoặc chỉ số cũ không được nhỏ hơn không');
		else {
			var copied = { ...this.state };

			var tieuThu = copied.chiSoMoi - copied.chiSoCu;
			var tieuThuMoiBac;
			if (tieuThu > 400) {
				tieuThuMoiBac = tieuThu - 400;
				copied.tienBac6 = tieuThuMoiBac * copied.bangGiaDien[5][0];
				copied.bangGiaDien[5][1] = tieuThuMoiBac;
				tieuThu = 400;
			}
			else {
				copied.bangGiaDien[5][1] = 0;
				copied.tienBac6 = 0;
			}

			if (tieuThu > 300) {
				tieuThuMoiBac = tieuThu - 300;
				copied.tienBac5 = tieuThuMoiBac * copied.bangGiaDien[4][0];
				copied.bangGiaDien[4][1] = tieuThuMoiBac;
				tieuThu = 300;
			}
			else {
				copied.bangGiaDien[4][1] = 0;
				copied.tienBac5 = 0;
			}

			if (tieuThu > 200) {
				tieuThuMoiBac = tieuThu - 200;
				copied.tienBac4 = tieuThuMoiBac * copied.bangGiaDien[3][0];
				copied.bangGiaDien[3][1] = tieuThuMoiBac;
				tieuThu = 200;
			}
			else {
				copied.bangGiaDien[3][1] = 0;
				copied.tienBac4 = 0;
			}

			if (tieuThu > 100) {
				tieuThuMoiBac = tieuThu - 100;
				copied.tienBac3 = tieuThuMoiBac * copied.bangGiaDien[2][0];
				copied.bangGiaDien[2][1] = tieuThuMoiBac;
				tieuThu = 100;
			}
			else {
				copied.bangGiaDien[2][1] = 0;
				copied.tienBac3 = 0;
			}

			if (tieuThu > 50) {
				tieuThuMoiBac = tieuThu - 50;
				copied.tienBac2 = tieuThuMoiBac * copied.bangGiaDien[1][0];
				copied.bangGiaDien[1][1] = tieuThuMoiBac;
				tieuThu = 50;
			}
			else {
				copied.bangGiaDien[1][1] = 0;
				copied.tienBac2 = 0;
			}

			copied.tienBac1 = tieuThu * copied.bangGiaDien[0][0];
			copied.bangGiaDien[0][1] = tieuThu;
			tieuThu = 0;

			this.setState(copied);
		}
	}
}